import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './WelcomePage.css';

export const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
            const navbar = document.querySelector('.welcome-navbar');
            const dashboardImg = document.querySelector('.dashboard-preview img');
            const currentScroll = window.pageYOffset;

            // Navbar hide/show
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            // Navbar shadow
            if (currentScroll === 0) {
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }

            // Dashboard image reveal
            const scrollPercentage = currentScroll / (document.documentElement.scrollHeight - window.innerHeight);
            const translateValue = Math.max(20 - scrollPercentage * 100, 0);
            dashboardImg.style.transform = `translateY(${translateValue}%)`;

            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Limpiar el evento al desmontar el componente
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className="welcome-navbar">
                <a href="#" className="welcome-logo">
                    <div className="logo-icon"></div>
                    <span className="logo-text">ToDoIt</span>
                </a>
                <div className="nav-links"></div>
                <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
            </nav>

            <section className="hero">
                <div className="background-pattern"></div>
                <div className="preview-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    ToDoIt 2.0 · Task Preview
                </div>
                <h1>
                    Organize Your Life
                    <br />
                    <span className="platform-text">With Ease</span>
                </h1>
                <p>
                    Track your tasks, manage your categories,
                    <br />
                    and boost your productivity.
                </p>
                <button className="signup-btn" onClick={() => navigate('/register')}>Get Started</button>

                <div className="dashboard-preview">
                    <img src="/images/pixelcut-export.jpg" alt="Task Manager Dashboard preview" />
                </div>
            </section>
        </>
    );
};
