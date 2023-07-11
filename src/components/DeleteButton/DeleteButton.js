import Button from '../Button/Button';
import './DeleteButton.css'

function DeleteButton({onDelete, movie}) {
  const handleDelete = () => onDelete(movie);

  return (
    <Button userClass="saved-movies__button_delete" onClick={handleDelete}/>
  );
}

export default DeleteButton;