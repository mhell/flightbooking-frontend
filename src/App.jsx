import { useState } from "react";

function App() {
  return (
    <div className="container pt-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>✈️ Flight Reservation Assistant</h2>
      </div>

      <div className="row g-4">
        {/* Left Panel (Chat) */}
        <div className="col-md-7 offset-lg-2">
          <Chat />
        </div>

        {/* Confirmed Booking */}
        <div className="col-md-3 overflow-scroll">
          <Booking />
        </div>
      </div>

      <div className="row py-4">
        <div className="col-md-7 offset-lg-2">
          {/* Available Flights */}
          <Flights />
        </div>
      </div>
    </div>
  );
}

const Chat = () => {
  return (
    <div className="card">
      <div className="card-body d-flex flex-column">
        <div className="chat-box mb-3 rounded border p-3">
          <div className="message user-message rounded-4">Show me available flights.</div>
          <div className="message bot-message rounded-4">Here are the available flights for you:</div>
        </div>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Type your message..." />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  return (
    <div className="card">
      <div className="card-header fw-bold">Confirmed Booking</div>
      <div class="card-body">
        <p>
          <strong>Flight ID:</strong> 178
        </p>
        <p>
          <strong>Flight Number:</strong> FL-102
        </p>
        <p>
          <strong>Passenger:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john.doe@email.com
        </p>
        <p>
          <strong>Departure:</strong> 10:00 AM
        </p>
        <p>
          <strong>Arrival:</strong> 1:00 PM
        </p>
        <p>
          <strong>Destination:</strong> New York
        </p>
        <p>
          <strong>Price:</strong> $300
        </p>
      </div>
    </div>
  );
};

const Flights = () => {
  return (
    <div className="card">
      <div className="card-header fw-bold">Flights</div>
      <div className="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Flight No.</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>245</td>
                <td>FL-102</td>
                <td>New York</td>
                <td>10:00 AM</td>
                <td>1:00 PM</td>
                <td>
                  <span class="badge bg-success">Available</span>
                </td>
                <td>$300</td>
              </tr>
              <tr>
                <td>312</td>
                <td>FL-205</td>
                <td>Los Angeles</td>
                <td>2:30 PM</td>
                <td>5:15 PM</td>
                <td>
                  <span class="badge bg-success">Available</span>
                </td>
                <td>$450</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
