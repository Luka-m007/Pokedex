import { HeartIcon } from '../../icons/HeartIcon'
import styled from 'styled-components'

const FavoriteIcon = styled(HeartIcon)`
	position: absolute;
	top: 1.2rem;
	left: 1.2rem;
	width: 2.4rem;
	height: 2.4rem;
	padding: 0.8rem;
	box-sizing: content-box;
	cursor: pointer;
	color: ${({ $isFavorite }) => ($isFavorite ? '#f80015' : '#00000')};
`

export const FavoritePokemonBtn = ({ onClick, isFavorite }) => {
	return <FavoriteIcon onClick={onClick} $isFavorite={isFavorite} />
}
