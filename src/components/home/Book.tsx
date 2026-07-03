import BookingForm from "../BookingForm";
import Container from "../Container";

const Book = () => {
  return (
    <section id="book" className="py-24">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-1">
            Book Your Event
          </h2>
          <p className="font-medium text-gray-500">
            Fill out the form below and we'll continue the conversation on
            WhatsApp to finalize your booking
          </p>
        </div>
        <div>
          <BookingForm />
        </div>
      </Container>
    </section>
  );
};

export default Book;
