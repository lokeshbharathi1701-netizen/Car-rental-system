import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { bookings, user, isLoggedIn, deleteBooking } = useAppContext();

  // Filter bookings for the current user (if user has email)
  const userBookings = isLoggedIn ? bookings.filter(b => b.email === user.email) : [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      deleteBooking(id);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="bookings-page">
        <section className="page-header">
          <div className="page-header__content">
            <h1 className="page-header__title">Access Denied</h1>
            <p className="page-header__subtitle">Please login to view your booking history.</p>
            <Link to="/login" className="btn btn--primary btn--lg" style={{ marginTop: '2rem' }}>Login Now</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bookings-page" id="bookings-page">
      <section className="page-header" id="bookings-header">
        <div className="page-header__content">
          <span className="page-header__badge">User Dashboard</span>
          <h1 className="page-header__title">My Bookings</h1>
          <p className="page-header__subtitle">
            You have total <strong>{userBookings.length}</strong> {userBookings.length === 1 ? 'booking' : 'bookings'} in your history.
          </p>
        </div>
      </section>

      <section className="bookings-content" id="bookings-content">
        <div className="section__container">
          {userBookings.length === 0 ? (
            <div className="bookings-empty" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎫</div>
              <h3>No Bookings Found</h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>You haven't rented any cars yet. Your future bookings will appear here.</p>
              <Link to="/cars" className="btn btn--primary btn--lg">Explore Our Fleet</Link>
            </div>
          ) : (
            <div className="bookings-table-wrapper" style={{ overflowX: 'auto', background: 'var(--clr-surface)', borderRadius: '20px', border: '1px solid var(--clr-border)', padding: '1rem' }}>
              <table className="bookings-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--clr-border)' }}>
                    <th style={{ padding: '1.25rem' }}>Booking ID</th>
                    <th style={{ padding: '1.25rem' }}>Car Details</th>
                    <th style={{ padding: '1.25rem' }}>Pickup / Drop</th>
                    <th style={{ padding: '1.25rem' }}>Dates</th>
                    <th style={{ padding: '1.25rem' }}>Total Cost</th>
                    <th style={{ padding: '1.25rem' }}>Status</th>
                    <th style={{ padding: '1.25rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                      <td style={{ padding: '1.25rem', fontWeight: 'bold' }}>#{booking.id}</td>
                      <td style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={booking.car.image} alt={booking.car.name} style={{ width: '60px', height: '40px', objectFit: 'contain' }} />
                          <div>
                            <div style={{ fontWeight: '600' }}>{booking.car.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>{booking.car.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.9rem' }}><strong>P:</strong> {booking.pickupLocation}</div>
                        <div style={{ fontSize: '0.9rem' }}><strong>D:</strong> {booking.dropLocation}</div>
                      </td>
                      <td style={{ padding: '1.25rem' }}>
                        <div style={{ fontSize: '0.9rem' }}>{booking.pickupDate}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>to {booking.returnDate}</div>
                      </td>
                      <td style={{ padding: '1.25rem', fontWeight: 'bold', color: 'var(--clr-primary)' }}>₹{booking.totalCost}</td>
                      <td style={{ padding: '1.25rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '50px', 
                          fontSize: '0.8rem', 
                          fontWeight: '600',
                          background: 'rgba(34, 197, 94, 0.15)',
                          color: 'var(--clr-success)'
                        }}>
                          {booking.status || 'Confirmed'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Link to="/track" className="btn btn--outline btn--sm">Track Live</Link>
                          <button 
                            onClick={() => handleDelete(booking.id)} 
                            className="btn btn--sm"
                            style={{ 
                              background: 'rgba(239, 68, 68, 0.1)', 
                              color: 'rgb(239, 68, 68)',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgb(239, 68, 68)';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                              e.currentTarget.style.color = 'rgb(239, 68, 68)';
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyBookings;
