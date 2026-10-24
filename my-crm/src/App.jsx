
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      company: "Tech Solutions",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      company: "Digital World",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      company: "Web Services",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");








useEffect(() => {
    fetch("http://localhost:5000/api/customers")
        .then((response) => response.json())
        .then((data) => {
            console.log("Backend Customers:", data);
        })
        .catch((error) => {
            console.error("Backend Error:", error);
        });
}, []);























  function addCustomer(event) {
    event.preventDefault();

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      company,
      status: "Active",
    };

    setCustomers((previous) => [...previous, newCustomer]);
    setName("");
    setEmail("");
    setCompany("");
    setShowForm(false);
  }

  function deleteCustomer(id) {
    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );
  }

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCount = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">NEXUS CRM</h2>

        <p className="menu-heading">MAIN MENU</p>

        <div className="menu-item active">📊 Dashboard</div>
        <div className="menu-item">👥 Customers</div>
        <div className="menu-item">📈 Reports</div>
        <div className="menu-item">⚙️ Settings</div>

        <div className="sidebar-bottom">
          <span>●</span> Enterprise Edition
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here is what's happening with your business.</p>
          </div>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin User</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Customers</span>
              <span className="stat-icon purple">👥</span>
            </div>
            <h2>{customers.length}</h2>
            <p>All registered customers</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Active Customers</span>
              <span className="stat-icon green">✓</span>
            </div>
            <h2>{activeCount}</h2>
            <p>Currently active</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Inactive Customers</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <h2>{inactiveCount}</h2>
            <p>Currently inactive</p>
          </div>
        </section>

        <section className="customers-section">
          <div className="section-header">
            <div>
              <h2>Customer Management</h2>
              <p>View, search and manage your customers.</p>
            </div>

            <button
              className="add-btn"
              onClick={() => setShowForm((previous) => !previous)}
            >
              {showForm ? "Cancel" : "+ Add Customer"}
            </button>
          </div>

          {showForm && (
            <form className="customer-form" onSubmit={addCustomer}>
              <input
                type="text"
                placeholder="Customer name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Company name"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                required
              />

              <button type="submit" className="add-btn">
                Save Customer
              </button>
            </form>
          )}

          <div className="search-row">
            <input
              className="search"
              type="search"
              placeholder="🔍  Search name, email or company..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <span className="result-count">
              {filteredCustomers.length} customers
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>EMAIL ADDRESS</th>
                  <th>COMPANY</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-name">
                        <div className="customer-avatar">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <strong>{customer.name}</strong>
                      </div>
                    </td>

                    <td>{customer.email}</td>
                    <td>{customer.company}</td>

                    <td>
                      <span
                        className={`badge ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          NEXUS CRM · Customer Management Dashboard
        </footer>
      </main>
    </div>
  );
}

export default App;
