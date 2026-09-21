import { HeartIcon } from '../../icons/HeartIcon'
import styled from 'styled-components'

const FavoriteIcon = styled(HeartIcon)`
	position: absolute;
	top: 1.2rem;
	right: 1.2rem;
	width: 2.7rem;
	height: 2.7rem;
	padding: 0.8rem;
	box-sizing: content-box;
	cursor: pointer;
	color: ${({ $isFavorite, theme }) => ($isFavorite ? theme.accent : theme.textSecondary)};
`

export const FavoritePokemonBtn = ({ onClick, isFavorite }) => {
	return <FavoriteIcon onClick={onClick} $isFavorite={isFavorite} />
}
