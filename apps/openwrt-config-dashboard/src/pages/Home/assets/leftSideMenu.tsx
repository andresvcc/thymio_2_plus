import { Icon } from 'mobsya-theme';
import React, { useState } from 'react';
import styled from 'styled-components';

type Item = {
  name: string;
  icon: string;
};

type LeftSideMenuProps = {
  items: Item[];
  onSelect: (name: string) => void;
};

const MenuContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 8rem;
  height: 100vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-bottom: 32px;
  color: #452ab6;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0rem;
  color: #6b6b6b;
  font-size: 0.9rem;

  &:hover {
    color: #f57715;
    background-color: #dee5f1;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 24px;
    cursor: pointer;
  }
`;

export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee5f1;
  background: linear-gradient(45deg, rgba(255, 255, 255, 1) 0%, rgba(222, 229, 241, 1) 75%);
`;

const Item = ({ name, icon, onSelect }: { name: string; icon: string; onSelect: (name: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onClick = () => {
    onSelect(name);
  };

  return (
    <MenuItem onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Icon name={icon} palleteFill={[isHovered ? '#F57715' : '#6b6b6b']} rotate={0} sizeH={20} sizeW={20} />
      {name}
    </MenuItem>
  );
};

const LeftSideMenu: React.FC<LeftSideMenuProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectItem = (name: string) => {
    setIsOpen(false);
    console.log('onSelect bt', name);
    onSelect(name);
  };

  return (
    <>
      <MenuIcon onClick={() => setIsOpen(!isOpen)}>ICON</MenuIcon>
      <MenuContainer isOpen={isOpen}>
        <LogoContainer>
          <Icon
            name="logoThymioByMobsya"
            palleteFill={['#452AB6', '#F57715']}
            palleteFillHover={['#452AB6AA', '#F57715AA']}
            rotate={0}
            sizeH={45}
            sizeW={110}
          />
        </LogoContainer>
        {items.map(({ name, icon }, index) => (
          <Item key={index} name={name} icon={icon} onSelect={onSelectItem} />
        ))}
      </MenuContainer>
    </>
  );
};

export default LeftSideMenu;
