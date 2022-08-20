import React, { useState } from 'react'
import './App.css'
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";

const eventsList = [
  {
      id: 1,
      time: "10:00",
      title: "Breakfast with Simon",
      location: "Lounge Caffe",
      description: "Discuss Q3 targets"
  },
  {
      id: 2,
      time: "10:30",
      title: "Daily Standup Meeting (recurring)",
      location: "Warsaw Spire Office"
  },
  { id: 3, time: "11:00", title: "Call with HRs" },
  {
      id: 4,
      time: "12:00",
      title: "Lunch with Timmoty",
      location: "Canteen",
      description:
      "going to eat a cheeseburger"
  }
]


function App() {
  const [modal, setModal] = useState(false);
  const [events, setEvents] = useState(eventsList); 
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const addEvent = () => {
    var newArray = [...events];
    newArray.push({
        id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
        time: time,
        title: title,
        location: location,
        description: description
    });
    setEvents(newArray);

  };

  const handleTimeChange = (time) => {
    const nextTime = time;
     setTime(nextTime); 
  }
  const handleTitleChange = (title) => {
    const nextTitle = title;
     setTitle(nextTitle); 
  }
  const handleLocationChange = (location) => {
    const nextLocation = location;
     setLocation(nextLocation); 
  }
  const handleDescriptionChange = (description) => {
    const nextDescription = description;
     setDescription(nextDescription); 
  }


  const handleDelete = eventId => {
    const filteredEvents = events.filter(e => e.id !== eventId);
      setEvents(filteredEvents);
  };

  const toggleModal = () => {
    setModal(!modal);
   };


  return (
        <React.Fragment>
        <MDBContainer>
            <MDBRow>
            <MDBCol md="9" className="mb-r">
                <h2 className="text-uppercase my-3">Today:</h2>
                <div id="events">
                {events.map(event => (
                    <Event
                      key={event.id}
                      id={event.id}
                      time={event.time}
                      title={event.title}
                      location={event.location}
                      description={event.description}
                      onDelete={handleDelete}
                    />
                ))}
                </div>
                <MDBRow className="mb-4">
                <MDBCol xl="3" md="6" className="mx-auto text-center">
                    <MDBBtn color="info" rounded onClick={toggleModal}>
                    Add Event
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md="3">
                <h3 className="text-uppercase my-3">Schedule</h3>
                <h6 className="my-3">
                It is going to be busy today. You have{" "}
                <b>{events.length} events </b>.
                </h6>
                <h1 className="my-3">
                    <MDBRow>
                    <MDBCol xs="3" className="text-center">
                        <MDBIcon icon="sun" fixed />
                    </MDBCol>
                    <MDBCol xs="9">Sunny</MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="thermometer-three-quarters" fixed />
                    </MDBCol>
                    <MDBCol xs="9">23°C</MDBCol>
                    </MDBRow>
                </h1>
                <p>
                Don't forget your rain jacket. Today will warm and humid, becoming
                warm in the afternoon with temperatures between 65 and 73
                degrees F in Chicago.
                </p>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={modal} toggle={toggleModal}>
            <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={toggleModal}
            >
            Add new event
            </MDBModalHeader>
            <MDBModalBody>
                <form className="mx-3 grey-text">
                    <MDBInput
                      name="time"
                      label="Time"
                      icon="clock"
                      hint="12:30"
                      group
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <MDBInput
                      name="title"
                      label="Title"
                      icon="edit"
                      hint="Briefing"
                      group
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <MDBInput
                      name="location"
                      label="Location (optional)"
                      icon="map"
                      group
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MDBInput
                      name="description"
                      label="Description (optional)"
                      icon="sticky-note"
                      group
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
            <MDBBtn
                color="info"
                onClick={() => {
                  toggleModal();
                  addEvent();
                }}
            >
                Add
            </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </React.Fragment>

  )
}

function Event({time, onDelete, location, title, id, description}) {
  return (
      <React.Fragment>
      <div className="media mt-1">
          <h3 className="h3-responsive font-weight-bold mr-3">
          {time}
          </h3>
          <div className="media-body mb-3 mb-lg-3">
          <MDBBadge
              color="danger"
              className="ml-2 float-right"
              onClick={() => onDelete(id)}
          >
              -
          </MDBBadge>
          <h6 className="mt-0 font-weight-bold">{title} </h6>{" "}
          <hr className="hr-bold my-2" />
          {location && (
              <React.Fragment>
              <p className="font-smaller mb-0">
                  <MDBIcon icon="location-arrow" /> {location}
              </p>
              </React.Fragment>
          )}
          </div>
      </div>
      {description && (
          <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
          {description}
          </p>
      )}
      </React.Fragment>
  );
}


export default App
