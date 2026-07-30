import { Outlet, Link } from "react-router-dom";
import { FiZap } from "react-icons/fi";
import "./AuthLayout.css";
export default function AuthLayout() {
  return (
    <div className="aio-auth">
      <aside className="aio-auth__side">
        <div className="aio-auth__brand">
          <div className="aio-auth__logo"><FiZap /></div>
          <span>AIO CRM</span>
        </div>
        <div className="aio-auth__pitch">
          <h2>The all-in-one CRM your revenue team will actually use.</h2>
          <p>Pipeline, contacts, activities and forecasting — unified in one clean workspace.</p>
          <ul>
            <li>Visual pipeline &amp; deal management</li>
            <li>Automated follow-ups &amp; task reminders</li>
            <li>Real-time reporting &amp; forecasting</li>
          </ul>
        </div>
        <div className="aio-auth__foot">© {new Date().getFullYear()} AIO CRM. All rights reserved.</div>
      </aside>
      <section className="aio-auth__panel">
        <div className="aio-auth__panel-inner slide-up">
          <Outlet />
          <p className="aio-auth__terms">
            By continuing, you agree to our <Link to="#">Terms</Link> and <Link to="#">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}