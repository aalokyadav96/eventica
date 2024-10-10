package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var tmpl = template.Must(template.ParseGlob("index.html"))

// Event struct definition
type Event struct {
	EventID           string                 `json:"event_id"`
	Title             string                 `json:"title"`
	Description       string                 `json:"description"`
	Location          string                 `json:"location"`
	Address           string                 `json:"address"`
	Tickets           []string               `json:"tickets"`         // Front, VIP, 1st floor
	TicketPrices      []int                  `json:"ticket_prices"`   // 120, 345, 480
	StartDateTime     time.Time              `json:"start_date_time"` // When the event starts
	EndDateTime       time.Time              `json:"end_date_time"`   // When the event ends
	OrganizerName     string                 `json:"organizer_name"`
	OrganizerContact  string                 `json:"organizer_contact"`
	TotalCapacity     int                    `json:"total_capacity"`
	TicketsSold       int                    `json:"tickets_sold"`
	Category          string                 `json:"category"`
	ImageURL          string                 `json:"image_url"`
	Status            string                 `json:"status"`
	AverageRating     float64                `json:"average_rating"`
	Reviews           []string               `json:"reviews"`
	WebsiteURL        string                 `json:"website_url"`
	SocialMediaLinks  []string               `json:"social_media_links"`
	AccessibilityInfo string                 `json:"accessibility_info"`
	CreatedAt         time.Time              `json:"created_at"`
	UpdatedAt         time.Time              `json:"updated_at"`
	Tags              []string               `json:"tags"`
	CustomFields      map[string]interface{} `json:"custom_fields"`
}

// Sample data
var events = []Event{
	{
		EventID:           "1",
		Title:             "Concert Night",
		Description:       "A night of music and fun.",
		Location:          "City Hall",
		Address:           "123 Main St, Cityville",
		Tickets:           []string{"Front", "VIP", "1st floor"},
		TicketPrices:      []int{120, 345, 480},
		StartDateTime:     time.Now().Add(48 * time.Hour), // Starts in 2 days
		EndDateTime:       time.Now().Add(50 * time.Hour), // Ends in 2 days
		OrganizerName:     "John Doe",
		OrganizerContact:  "john@example.com",
		TotalCapacity:     500,
		TicketsSold:       100,
		Category:          "Music",
		ImageURL:          "https://example.com/image.jpg",
		Status:            "Upcoming",
		AverageRating:     4.5,
		Reviews:           []string{"Great event!", "Had a blast!"},
		WebsiteURL:        "https://example.com/concert",
		SocialMediaLinks:  []string{"https://twitter.com/concert", "https://facebook.com/concert"},
		AccessibilityInfo: "Wheelchair accessible",
		CreatedAt:         time.Now(),
		UpdatedAt:         time.Now(),
		Tags:              []string{"music", "concert"},
		CustomFields:      map[string]interface{}{"age_limit": "18+"},
	},
	// Add more events as needed
}

func getEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

func getEventByID(w http.ResponseWriter, r *http.Request) {
	eventID := r.URL.Path[len("/events/"):] // Get event ID from URL
	for _, event := range events {
		if event.EventID == eventID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(event)
			return
		}
	}
	http.Error(w, "Event not found", http.StatusNotFound)
}

func main() {

	router := mux.NewRouter()

	// Define the route for fetching place details
	router.HandleFunc("/", Index).Methods("GET")
	router.HandleFunc("/events", getEvents).Methods("GET")
	router.HandleFunc("/events/", getEventByID).Methods("GET")
	// CORS setup
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Update with your frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
	})

	// Serve static files (HTML, CSS, JS)
	router.PathPrefix("/css/").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	router.PathPrefix("/js/").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	router.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("uploads"))))

	// Start the server on port 4000
	log.Println("Server running on port 4000")
	log.Fatal(http.ListenAndServe("localhost:4000", c.Handler(router)))

}

func Index(w http.ResponseWriter, r *http.Request) {
	tmpl.ExecuteTemplate(w, "index.html", nil)
}
