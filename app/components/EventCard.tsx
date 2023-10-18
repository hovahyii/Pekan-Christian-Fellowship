import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  imageUrl: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, date, time, venue, description, imageUrl } = event;
  const defaultImageUrl = 'https://media.swncdn.com/cms/CW/faith/47910-church-fellowship-1200.1200w.tn.jpg'; // Replace with your default image URL

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          src={imageUrl || defaultImageUrl}
          alt={title}
          className="mb-2 w-full md:h-full object-cover"
        />
      </div>
      <div className="md:w-2/3 p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Venue:</strong> {venue}
        </p>
        {description && (
          <div className="mt-2">
            <p>
              <strong>Description:</strong>
            </p>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
