import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

export const Filter = ({ filter, onChangeFilter }) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        type="text"
        placeholder="Search"
        name="filter"
        value={filter}
        onChange={onChangeFilter}
        className={css.input}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
