import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { flightBookingService } from "./services/FlightBookingService";

const welcomeMsg = "Hello. How can I assist you with your flight reservations today?";

function App() {
  const [chatId] = useState(nanoid());
  const [chatMessages, setChatMessages] = useState([{role: "ai", text: welcomeMsg}]);
  const [bookedFlight, setBookedFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindow = useRef(null);

  useEffect(() => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight
  }, [chatMessages]);

  const handleChat = async (message) => {
    let newChat = [];
    if (message) {
      newChat.push({ role: "user", text: message });
      setChatMessages([...chatMessages, ...newChat]);
    }
    setIsLoading(true);
    const response = await flightBookingService.chat(chatId, message);
    if (response?.chatResponse) {
      newChat.push({ role: "ai", text: response.chatResponse })
      setChatMessages([...chatMessages, ...newChat]);
    }
    if (response?.bookedFlight) {
      setBookedFlight(response.bookedFlight);
    }
    if (response?.flights.length) {
      setFlights(response.flights);
    }
    setIsLoading(false);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>✈️ Flight Reservation Assistant</h2>
      </div>
      <div className="row g-4">
        {/* Left Panel (Chat) */}
        <div className="col-lg-8 col-xl-6 offlset-lg-2 offset-xl-3">
          <Chat chatMessages={chatMessages} onSubmit={handleChat} reference={chatWindow} isLoading={isLoading} />
        </div>
        {/* Confirmed Booking */}
        <div className="col-lg-4 col-xl-3 overflow-scroll">{bookedFlight && <Booking booking={bookedFlight} />}</div>
        <div className="col-lg-8 col-xl-6 offlset-lg-2 offset-xl-3">
          {/* Available Flights */}
          {flights?.length > 0 && <Flights flights={flights} />}
        </div>
      </div>
    </div>
  );
}

const Chat = ({ chatMessages, onSubmit, reference, isLoading }) => {
  const [chatInput, setChatInput] = useState("");

  const handleForm = (event) => {
    event.preventDefault();
    onSubmit(chatInput);
    setChatInput("");
  }

  return (
    <div className="card">
      <div className="card-body d-flex flex-column">
        <div className="chat-box rounded border overflow-auto p-3 mb-3" ref={reference}>
          {chatMessages.map((message, index) => (
            <ChatBubble role={message.role} text={message.text} key={index} />
          ))}
          {isLoading && <div className="message opacity-100 rounded-4"><span className="loader"></span></div>}
        </div>
          <form>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Type your message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
              <button className="btn btn-primary" onClick={handleForm}>
                Send
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

const ChatBubble = ({ role, text }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    node.style.opacity = 1;
    return () => {
      node.style.opacity = 0;
    };
  }, []);
  
  return (
    <div className={`message rounded-4 ${role === "user" && "text-bg-primary ms-auto"}`} ref={ref}>{text}</div>
  );
}

const Booking = ({ booking }) => {
  return (
    <div className="booking card">
      <div className="card-header fw-bold">Confirmed Booking</div>
      <div className="card-body">
        <p>
          <strong>Flight ID:</strong> {booking?.id}
        </p>
        <p>
          <strong>Flight Number:</strong> {booking?.flightNumber}
        </p>
        <p>
          <strong>Passenger:</strong> {booking?.passengerName}
        </p>
        <p>
          <strong>Email:</strong> {booking?.passengerEmail}
        </p>
        <p>
          <strong>Departure:</strong> {dateFormat(booking?.departureTime)}
        </p>
        <p>
          <strong>Arrival:</strong> {dateFormat(booking?.arrivalTime)}
        </p>
        <p>
          <strong>Destination:</strong> {booking?.destination}
        </p>
        <p>
          <strong>Price:</strong> ${booking?.price}
        </p>
      </div>
    </div>
  );
};

const Flights = ({ flights }) => {
  return (
    <div className="card small">
      <div className="card-header fw-bold">Flights</div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Flight No.</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                {flights[0].status && <th>Status</th>}
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {flights?.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.destination}</td>
                  <td>{dateFormat(flight.departureTime)}</td>
                  <td>{dateFormat(flight.arrivalTime)}</td>
                  {flight.status &&
                    <td>
                      <span className={`badge ${flight.status === "AVAILABLE" ? "bg-success" : "bg-warning"}`}>{flight.status}</span>
                    </td>
                  }
                  <td>${flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function dateFormat(dateStr) {
  return dateStr?.slice(0, 16).replace("T", " ");
}

export default App;
