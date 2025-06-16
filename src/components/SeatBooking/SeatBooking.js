import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { getEvents, reserveSeats } from "api/pushSetor/setor";

export const SeatBooking = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setSelectedEvent(data[0] || null);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setError("Não foi possível carregar os eventos.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSeatSelection = (seat, setor) => {
    const seatKey = `${setor.id}-${seat.id}`;
    const isSelected = selectedSeats.includes(seatKey);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  const handleConfirmSelection = async () => {
    try {
      await reserveSeats({
        event_id: selectedEvent.id,
        seats: selectedSeats.map((seat) => {
          const [setorId, seatId] = seat.split("-");
          return { setor_id: parseInt(setorId), seat_id: parseInt(seatId) };
        }),
      });
      setError(null);
      alert("Cadeiras reservadas com sucesso!"); // Substituir por modal em produção
      setSelectedSeats([]);
      const data = await getEvents();
      setEvents(data);
      setSelectedEvent(data.find((e) => e.id === selectedEvent.id) || data[0]);
    } catch (error) {
      console.error("Erro ao reservar cadeiras:", error);
      setError(
        error.response?.data?.error || "Erro ao reservar cadeiras. Tente novamente."
      );
    }
  };

  if (loading) return <div className="text-center mt-5">Carregando...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!events.length)
    return <div className="text-center mt-5">Nenhum evento disponível.</div>;

  return (
    <div className="container mt-5">
      <Events
        events={events}
        selectedEvent={selectedEvent}
        onChange={(event) => {
          setSelectedSeats([]);
          setSelectedEvent(event);
        }}
      />
      <ShowCase />
      {selectedEvent && (
        <>
          <Cinema
            setores={selectedEvent.setores}
            selectedSeats={selectedSeats}
            onSeatSelection={handleSeatSelection}
          />
          <p className="text-center mt-4">
            Você selecionou{" "}
            <span className="fw-bold">{selectedSeats.length}</span> cadeiras.
            <button
              className="btn btn-primary ms-3"
              onClick={handleConfirmSelection}
              disabled={!selectedSeats.length}
            >
              Confirmar Seleção
            </button>
          </p>
        </>
      )}
      {error && <div className="text-center text-danger mt-3">{error}</div>}
    </div>
  );
};

const Events = ({ events, selectedEvent, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="event" className="form-label fs-5">
        Escolha um evento
      </label>
      <select
        id="event"
        className="form-select bg-secondary text-white border-secondary"
        value={selectedEvent ? selectedEvent.id : ""}
        onChange={(e) =>
          onChange(events.find((event) => event.id === parseInt(e.target.value)))
        }
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

const ShowCase = () => {
  return (
    <ul className="list-unstyled d-flex justify-content-center gap-4 mb-4">
      <li className="d-flex align-items-center">
        <span
          className="d-inline-block rounded me-2"
          style={{ width: "20px", height: "20px", backgroundColor: "#6c757d" }}
        ></span>
        <small>Disponível</small>
      </li>
      <li className="d-flex align-items-center">
        <span
          className="d-inline-block rounded me-2"
          style={{ width: "20px", height: "20px", backgroundColor: "#0d6efd" }}
        ></span>
        <small>Selecionado</small>
      </li>
      <li className="d-flex align-items-center">
        <span
          className="d-inline-block rounded me-2"
          style={{ width: "20px", height: "20px", backgroundColor: "#dc3545" }}
        ></span>
        <small>Reservado</small>
      </li>
    </ul>
  );
};

const Cinema = ({ setores, selectedSeats, onSeatSelection }) => {
  return (
    <div className="mb-4">
      <div className="bg-secondary rounded text-center py-3 mb-4">Tela</div>
      {setores.map((setor) => {
        // Calcular o número de colunas com base no layout real do setor
        const maxColumn = Math.max(
          ...setor.cadeiras.map((seat) => parseInt(seat.column_assent) || 1)
        );
        return (
          <div key={setor.id} className="mb-4">
            <h3 className="fs-5 fw-semibold mb-2">{setor.nome}</h3>
            <div className={`row row-cols-${maxColumn} g-2`}>
              {setor.cadeiras.map((seat) => {
                const seatKey = `${setor.id}-${seat.id}`;
                const isSelected = selectedSeats.includes(seatKey);
                const isReserved = seat.status === "reserved";
                return (
                  <div key={seat.id} className="col">
                    <span
                      className={clsx(
                        "d-flex align-items-center justify-content-center rounded text-sm",
                        {
                          "bg-danger": isReserved,
                          "bg-primary": isSelected,
                          "bg-secondary": !isReserved && !isSelected,
                          "cursor-pointer hover-bg-light":
                            !isReserved && seat.status === "available",
                          "cursor-not-allowed": isReserved,
                        }
                      )}
                      style={{ width: "40px", height: "40px" }}
                      onClick={
                        !isReserved && seat.status === "available"
                          ? () => onSeatSelection(seat, setor)
                          : null
                      }
                      role={isReserved ? null : "button"}
                      aria-label={
                        isReserved
                          ? `Assento ${seat.row_assent}${seat.column_assent} reservado`
                          : `Assento ${seat.row_assent}${seat.column_assent} disponível`
                      }
                      title={`${seat.row_assent}${seat.column_assent}`}
                    >
                      {seat.row_assent}
                      {seat.column_assent}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeatBooking;