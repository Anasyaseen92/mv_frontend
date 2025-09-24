import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';
import { useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader';
function EventsPage() {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents.length > 0 ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <p className="text-center mt-10">No events available</p>
          )}
        </div>
      )}
    </>
  );
}



export default EventsPage;