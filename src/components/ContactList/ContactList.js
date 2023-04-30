import PropTypes from 'prop-types';
import css from 'components/ContactList/ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <div key={id} className={css.container}>
            <li className={css.item}>
              <span className={css.span}>{name}: </span>
              {number}
            </li>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className={css.btn}
            >
              Delete
            </button>
          </div>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
