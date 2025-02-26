import { useNavigate } from 'react-router-dom';
import Button from './Button'

function BackButton() {
    const navigat = useNavigate();
    return (
        <Button type='back' onClick={() => navigat(-1)}>
            Back
        </Button>

    )
}

export default BackButton