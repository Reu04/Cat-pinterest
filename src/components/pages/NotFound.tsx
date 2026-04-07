import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Страница не найдена</p>

            <Link to="/" className="not-found__link">
                На главную
            </Link>
        </div>
    );
}