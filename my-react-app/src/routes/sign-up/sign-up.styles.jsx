import React, { useState } from 'react';
import styled from 'styled-components';

export const ImageUploadContainer = styled.div`
  border: 1px dashed #b45ba2;
  padding: 3px;
  text-align: center;
`;

export const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const UploadedImage = styled.img`
  max-width: 200px;
  max-height: 200px;

`;

export const UploadPlaceholder = styled.span`
  color: #888;
`;

export const ImageUploadInput = styled.input`
  display: none;
`;