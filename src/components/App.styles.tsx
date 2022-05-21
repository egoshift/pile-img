import styled from 'styled-components'

import Button from './atoms/Button/Button.styles'

export const AppBackground = styled.div`
  background-image: url('../../dotted-rounded-rectangle.png');
  background-repeat: repeat;
  height: 100%;
  animation: slide 100s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @keyframes slide {
    from { background-position: right 0; }
    to { background-position: right 500px; }
  }
`

export const AppSubtitle = styled.h1`
  font-size: 3em;
  margin-bottom: 0;
`

export const AppDisplay = styled.h1`
  font-size: 3.3em;
  margin-top: 0;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`

export const AppButton = styled(Button)`
  margin-top: 8rem;
  min-width: 25%;
`
