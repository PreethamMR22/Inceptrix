import React, { useState } from "react";
import "../PageCSS/Dashboard.css";

const priorityTasks = [
  {
    id: 1,
    title: "Fire near MG Road",
    description: "A fire has broken out near MG Road. Immediate response required.",
    image: "https://res.cloudinary.com/preethamcloud/image/upload/v1745405967/euva3wdtex7rnr9m47vt.jpg"
  },
  {
    id: 2,
    title: "Flooding in JP Nagar",
    description: "Heavy rain has caused flooding in JP Nagar area.",
    image: "https://res.cloudinary.com/preethamcloud/image/upload/v1745254727/d7sfwxvdwjesxky1whn6.jpg"
  },
  {
    id: 3,
    title: "Accident at Silk Board",
    description: "A multi-vehicle accident has occurred at Silk Board junction.",
    image: "https://res.cloudinary.com/preethamcloud/image/upload/v1744451355/samples/dessert-on-a-plate.jpg"
  }
];

const issues = [
  {
    id: 4,
    title: "Broken Traffic Light at 5th Avenue",
    description: "The traffic light near 5th Avenue is malfunctioning and causing traffic jams.",
    image: "https://res.cloudinary.com/preethamcloud/image/upload/v1744451355/samples/traffic-light.jpg"
  },
  {
    id: 5,
    title: "Streetlight Outage in Whitefield",
    description: "Multiple streetlights in Whitefield are not working, causing visibility issues.",
    image: "https://res.cloudinary.com/preethamcloud/image/upload/v1744451355/samples/streetlight.jpg"
  }
];

function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [priorityIndex, setPriorityIndex] = useState(0);
  const [issueIndex, setIssueIndex] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const totalTasks = [...priorityTasks, ...issues];

  const handleNavClick = (item) => {
    setActiveNav(item);
  };
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleResolved = () => {
    if (resolvedCount < totalTasks.length) {
      setResolvedCount(resolvedCount + 1);
    }

    if (priorityIndex < priorityTasks.length) {
      setPriorityIndex(priorityIndex + 1);
    } else if (issueIndex < issues.length) {
      setIssueIndex(issueIndex + 1);
    }

    setIsModalOpen(false);
  };

  const handleNotSeen = () => {
    setIsModalOpen(false);
  };

  const openTaskDetails = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowAllTasks(false);
  };

  const renderPriorityTask = () => {
    if (priorityIndex < priorityTasks.length) {
      const task = priorityTasks[priorityIndex];
      return (
        <div className="priority-task-bar">
          <h3>🚨 Highest Priority Task</h3>
          <img src={task.image} alt={task.title} className="priority-img" />
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="priority-buttons">
            <button className="resolved-btn" onClick={handleResolved}>Resolved</button>
            <button className="not-seen-btn" onClick={handleNotSeen}>Not Seen</button>
          </div>
        </div>
      );
    } else if (issueIndex < issues.length) {
      const task = issues[issueIndex];
      return (
        <div className="priority-task-bar" style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}>
          <h3>📋 Reported Issue</h3>
          <img src={task.image} alt={task.title} className="priority-img" />
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="priority-buttons">
            <button className="resolved-btn" onClick={handleResolved}>Resolved</button>
            <button className="not-seen-btn" onClick={handleNotSeen}>Not Seen</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Connect</h2>
        <ul className="nav">
          {["Dashboard", "Applicant tracker", "People", "Who's away", "Reflect"].map((item) => (
            <li key={item} className={activeNav === item ? "active" : ""} onClick={() => handleNavClick(item)}>
              {item}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">Settings</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <input type="text" placeholder="Search" className="search" />
          <div className="user-profile" style={{"paddingLeft":"15px"}}>
            <img src="https://i.pravatar.cc/32" alt="User" className="avatar" />
          </div>
        </header>

        {renderPriorityTask()}

        <section className="greeting">
      <h2>{getGreeting()}, Admin</h2>
    </section>

        <section className="dashboard-grid">
          <div className="tasks-card">
            <h3>My tasks</h3>
            <ul>
              {totalTasks.slice(0, 3).map((task) => (
                <li key={task.id} onClick={() => openTaskDetails(task)}>
                  {task.title} - {task.description.substring(0, 30)}...
                </li>
              ))}
            </ul>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowAllTasks(true); setIsModalOpen(true); }}>See all tasks</a>
          </div>

          <div className="quick-actions">
            <div className="card blue">Resolved issues<br /><small>{resolvedCount} resolved</small></div>
            <div className="card green">Total issues reported today<br /><small>{totalTasks.length} reported</small></div>
            <div className="card purple">FAQ<br /><small>Find all the answers</small></div>
          </div>

          <div className="calendar-section">
            <div className="calendar-header">
              <h4>December 2023</h4>
              <div className="calendar-days">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
            <div className="calendar-body">
              <p>Upcoming calendar tasks:</p>
              <ul>
                <li><b>05</b> UX/UI workshop – 14:00-14:45</li>
                <li><b>06</b> Interaction design – 11:00-14:45</li>
                <li><b>07</b> Team Meeting – 12:00-12:35</li>
                <li><b>08</b> User interview – 16:00-17:00</li>
                <li><b>09</b> User interview – 16:00-16:30</li>
              </ul>
            </div>
          </div>

          <div className="working-hours">
            <h4>Total working hours</h4>
            <div className="bar-graph">
              {[8, 6, 4, 5, 7, 3, 6].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h * 10}px` }}></div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {showAllTasks ? (
              <>
                <h4>All Tasks</h4>
                <ul>
                  {totalTasks.map((task) => (
                    <li key={task.id} style={{ cursor: "pointer", marginBottom: "8px", color: "#2563eb" }} onClick={() => { openTaskDetails(task); setShowAllTasks(false); }}>
                      {task.title} - {task.description.substring(0, 40)}...
                    </li>
                  ))}
                </ul>
                <button className="close-btn" onClick={closeModal}>Close</button>
              </>
            ) : (
              currentTask && (
                <>
                  <h4>{currentTask.title}</h4>
                  <p>{currentTask.description}</p>
                  <img src={currentTask.image} alt={currentTask.title} className="priority-img" />
                  <div className="priority-buttons">
                    <button className="resolved-btn" onClick={handleResolved}>Resolved</button>
                    <button className="not-seen-btn" onClick={handleNotSeen}>Not Seen</button>
                  </div>
                  <button className="close-btn" onClick={closeModal}>Close</button>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
