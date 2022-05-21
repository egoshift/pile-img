import styled from 'styled-components'

const Button = styled.button`
  border: unset;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  background-color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.primary};
`

export default Button