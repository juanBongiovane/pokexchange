import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const AlertMessage = ({mensaje, tipo}) =>{

    if(tipo === 'error'){

        return (
            <div className={'error-message'}>
                <ErrorIcon/> <span>{mensaje}</span>
            </div>
        )
    }

    return (
        <div className={'ok-message'}>
            <CheckCircleIcon/><span>{mensaje}</span>
        </div>
    );

}

export default AlertMessage;