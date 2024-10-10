// render.js
export function renderSkeleton() {
    return `
        <header id="bodyheader"></header>
        <div class="container flexh">
            <main id="main"></main>
            <aside id="aside"></aside>    
        </div>
        <footer id="footer"></footer>`;
}

export function renderNav() {
    return `<nav id="topnav"><ul><li><a href="./">Home</a></li><li><a href="./create">Create</a></li></ul></nav>`;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}


export function renderFetchedEvent(event) {
    let customFieldsHTML = '';

    for (const [key, value] of Object.entries(event.custom_fields)) {
        customFieldsHTML += `<p><strong>${capitalizeWords(key.replace(/_/g, ' '))}:</strong> ${value}</p>`;
    }
    // Iterate over custom fields to dynamically generate HTML
    // for (const [key, value] of Object.entries(event.custom_fields)) {
    //     customFieldsHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${value}</p>`;
    // }
    return `
        <div id="tabs">
            <div class="tab active" data-tab="tab1">Event Details</div>
            <div class="tab" data-tab="tab2">Tickets</div>
            <div class="tab" data-tab="tab3">Reviews</div>
            <div class="tab" data-tab="tab4">Media</div>
            <div class="tab" data-tab="tab5">Social</div>
        </div>

        <div id="tab-content">
            <div id="tab1" class="tab-content active">
                <h1>${event.title}</h1>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Location:</strong> ${event.location}, ${event.address}</p>
                <p><strong>Date & Time:</strong> ${new Date(event.start_date_time).toLocaleString()} - ${new Date(event.end_date_time).toLocaleString()}</p>
                <p><strong>Organizer:</strong> ${event.organizer_name} (${event.organizer_contact})</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Status:</strong> ${event.status}</p>
                <p><strong>Tickets Available:</strong> ${event.total_capacity - event.tickets_sold} / ${event.total_capacity}</p>
                <p><strong>Average Rating:</strong> ${event.average_rating}</p>
                <p><strong>Tags:</strong> ${event.tags.map(link => `<span>${link}</span>`).join(', ')}</p>
                <p><strong>Accessibility Info:</strong> ${event.accessibility_info}</p>
                ${customFieldsHTML}
            </div>
            <div id="tab2" class="tab-content">
                <h2>Tickets</h2><sup>for event id : ${event.event_id}</sup>
                <p><strong>Available Tickets:</strong></p>
                <ul>
                    ${event.tickets.map((ticket, index) => `
                        <li>
                            ${ticket} - $${event.ticket_prices[index]}
                        </li>
                    `).join('')}
                </ul>
                <button id='buyticketsfn'>Buy Tickets</button>
            </div>
            <div id="tab3" class="tab-content">
                <p><strong>Reviews:</strong> ${event.reviews.join(', ')}</p>
            </div>
            <div id="tab4" class="tab-content">
                <img src="${event.image_url}" alt="${event.title}">
            </div>
            <div id="tab5" class="tab-content">
                <p><strong>Website:</strong> <a href="${event.website_url}" target="_blank">${event.website_url}</a></p>
                <p><strong>Social Media:</strong> ${event.social_media_links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ')}</p>
            </div>
        </div>
    `;
}

export function loadTabFunctionality() {
    // Tab click event
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            loadTabContent(tabId);
        });
    });

    // Function to load content into the tab
    function loadTabContent(tabId) {
        // Hide all tabs and remove active class
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show the clicked tab
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    }
}

// function setupTicketListeners(event) {
//     event.tickets.forEach((ticket, index) => {
//         document.getElementById(`buy-${index}`).addEventListener('click', purchaseTickets);
//     });
// }


// export function renderFetchedEvent(event) {
//     return `
//         <div id="tabs">
//             <div class="tab active" data-tab="tab1">Event Details</div>
//             <div class="tab" data-tab="tab2">Reviews</div>
//             <div class="tab" data-tab="tab3">Social Media</div>
//         </div>

//         <div id="tab-content">
//             <div id="tab1" class="tab-content active">
//                 <h1>${event.title}</h1>
//                 <img src="${event.image_url}" alt="${event.title}">
//                 <p><strong>Description:</strong> ${event.description}</p>
//                 <p><strong>Location:</strong> ${event.location}, ${event.address}</p>
//                 <p><strong>Organizer:</strong> ${event.organizer_name} (${event.organizer_contact})</p>
//                 <p><strong>Date & Time:</strong> ${new Date(event.start_date_time).toLocaleString()} - ${new Date(event.end_date_time).toLocaleString()}</p>
//                 <p><strong>Category:</strong> ${event.category}</p>
//                 <p><strong>Status:</strong> ${event.status}</p>
//                 <p><strong>Tickets Available:</strong> ${event.total_capacity - event.tickets_sold} / ${event.total_capacity}</p>
//                 <p><strong>Average Rating:</strong> ${event.average_rating}</p>
//             </div>
//             <div id="tab2" class="tab-content">
//                 <p><strong>Reviews:</strong> ${event.reviews.join(', ')}</p>
//             </div>
//             <div id="tab3" class="tab-content">
//                 <p><strong>Website:</strong> <a href="${event.website_url}" target="_blank">${event.website_url}</a></p>
//                 <p><strong>Social Media:</strong> ${event.social_media_links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ')}</p>
//             </div>
//         </div>
//     `;
// }

// export function renderFetchedEvent(event) {
//     return `
//         <h1>${event.title}</h1>
//         <img src="${event.image_url}" alt="${event.title}">
//         <p><strong>Description:</strong> ${event.description}</p>
//         <p><strong>Location:</strong> ${event.location}, ${event.address}</p>
//         <p><strong>Organizer:</strong> ${event.organizer_name} (${event.organizer_contact})</p>
//         <p><strong>Date & Time:</strong> ${new Date(event.start_date_time).toLocaleString()} - ${new Date(event.end_date_time).toLocaleString()}</p>
//         <p><strong>Category:</strong> ${event.category}</p>
//         <p><strong>Status:</strong> ${event.status}</p>
//         <p><strong>Tickets Available:</strong> ${event.total_capacity - event.tickets_sold} / ${event.total_capacity}</p>
//         <p><strong>Average Rating:</strong> ${event.average_rating}</p>
//         <p><strong>Reviews:</strong> ${event.reviews.join(', ')}</p>
//         <p><strong>Website:</strong> <a href="${event.website_url}" target="_blank">${event.website_url}</a></p>
//         <p><strong>Social Media:</strong> ${event.social_media_links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ')}</p>
//         <p><strong>Accessibility Info:</strong> ${event.accessibility_info}</p>
//         <p><strong>Age Limit:</strong> ${event.custom_fields.age_limit}</p>
//         <p><strong>Tags:</strong> ${event.tags.join(', ')}</p>`;
// }
