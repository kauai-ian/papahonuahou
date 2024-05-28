// todo: fix this fetch. it gets a single event based on matching the selected eventId with the database eventID.
//   const fetchEvent = async () => {
//     try {
//       if (eventIds.length === 0) {
//         setEvents([]);
//         return;
//       }
//       const eventDetails = await Promise.all(
//         eventIds.map((eventId) =>
//           api.getEvent(eventId).catch((error) => {
//             console.error(`Error fetching event with id ${eventId}`, error);
//             return null;
//           })
//         )
//       );
//       const validEventDetails = eventDetails.filter(
//         (detail): detail is { data: EventProps } => detail !== null
//       );

//       if (validEventDetails.length === 0) {
//         setEvents([]);
//         console.error("No Events to display");
//       } else {
//         setEvents(validEventDetails.map((detail) => detail.data));
//       }
//       console.log("eventdetails", eventDetails);
//     } catch (error) {
//       console.error("Error fetching event details", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvent();
//   }, []);
