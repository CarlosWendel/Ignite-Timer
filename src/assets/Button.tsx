import style from './modules/Button.module.css'
import { ButtonContainer, ButtonVariant } from './modules/Button.style';


interface Buttonprops{
    variant?:ButtonVariant;
}
export function Button({variant = 'primary'}:Buttonprops){
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}