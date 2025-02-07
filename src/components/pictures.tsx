import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeModal, picturesSelector, selectPicture, getSelectedPicture} from '../reducer';
import ModalPortal from './modal';
import { isSome, Option } from 'fp-ts/lib/Option';
import { Picture } from '../types/picture.type';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const pictures = useSelector(picturesSelector); // Récupère les images depuis Redux
  const selectedPicture: Option<Picture> = useSelector(getSelectedPicture);
  const dispatch = useDispatch();

  return (
    <div>
    <Container>
      {pictures.map((picture, index) => (
        <Image key={index} src={picture.previewFormat} alt={`Image ${index}`}  onClick={() => dispatch(selectPicture(picture))}/>
      ))}
    </Container>
    {isSome(selectedPicture) && (
        <ModalPortal
        largeFormat={selectedPicture.value.largeFormat}
          author={selectedPicture.value.author}
        close={() => dispatch(closeModal())} 
        />
      )}
    </div>


  );
};


export default Pictures;
