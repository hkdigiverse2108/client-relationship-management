import "./PageHeader.css";
export default function PageHeader({ title, description, actions }) {
  return (
    <header className="aio-page-header">
      <div>
        <h1 className="aio-page-header__title">{title}</h1>
        {description && <p className="aio-page-header__desc">{description}</p>}
      </div>
      {actions && <div className="aio-page-header__actions">{actions}</div>}
    </header>
  );
}