import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';

const Container = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 50px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
`;

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  color: black;
  font-size: 40px;
  font-weight: bold;
`;
const AuthorText = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
`;

const Image = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
`;

interface ModalProps {
  largeFormat: string;
  author: string; 
  close(): void;
}

const Modal = ({ largeFormat, author, close }: ModalProps) => {
  return (
    <Container>
      <Button onClick={close}>X</Button>
      <Image src={largeFormat} alt="Image en grand format" />
      <AuthorText>Auteur de la photo : {author || "unknown"}</AuthorText> 
    </Container>
  );
};

const portalRoot = document.getElementById('modal');

const ModalPortal = ({ largeFormat, author, close }: ModalProps) =>
  portalRoot ? ReactDOM.createPortal(<Modal largeFormat={largeFormat} author={author}  close={close} />, portalRoot) : null;

export default ModalPortal;
