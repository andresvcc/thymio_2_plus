import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import CellTowerIcon from '@mui/icons-material/CellTower';
import SettingsIcon from '@mui/icons-material/Settings';

export const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f580;
  overflow-x: hidden;
  border-radius: 0.5rem;
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const TopHeadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const MobileTopHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const MenuContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

export const BoxMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  height: calc(100% - 4rem);
  width: calc(100% - 2rem);
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #dee5f160;
`;

export const OptionsMenuContainer = styled.div`
  height: calc(100% - 15rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const withHoverEffect = (IconUI: any) => {
  return styled(IconUI)`
    color: #9ca3ae; // Color inicial del icono
    transition: color 0.3s; // Transición suave del color
  `;
};

export const HoverableHomeIcon = withHoverEffect(HomeIcon);
export const HoverableCellTowerIcon = withHoverEffect(CellTowerIcon);
export const HoverableSettingsIcon = withHoverEffect(SettingsIcon);

// Estiliza el MenuItem
export const StyledMenuItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: calc(100% - 2rem);
  text-align: left;
  color: ${({ selected }) => (selected ? '#f47715' : '#757b84')};
  background-color: ${({ selected }) => (selected ? 'rgba(0, 0, 0, 0.06)' : 'transparent')};

  .MuiSvgIcon-root {
    width: 1.8rem;
    height: 1.8rem;
    width: 2rem;
    padding-right: 0.5rem;
    color: ${({ selected }) => (selected ? '#f47715' : '#757b84')};
  }

  &:hover {
    background-color: ${({ selected }) => (selected ? 'rgba(0, 0, 0, 0.09)' : 'transparent')};

    color: #f47715; // Color al hacer hover

    // Cambia el color del icono al hacer hover
    .MuiSvgIcon-root {
      color: #f47715;
    }
  }
`;

export const Divider = styled.div`
  width: calc(100% - 1rem);
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: 2px 0px;
`;

// Si no tienes un componente Typographie, puedes usar Typography directamente
export const StyledTypography = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 0.8rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.div`
  height: 100%;
  transform: translateY(0.15rem);
  color: #757b84;
`;

export const MenuMobileContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0.5rem;
  left: -2%;
  z-index: 1000;
  width: 80%;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-120%)')};
  transition: transform 0.3s ease-in-out;
`;

export const BackgroundMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #00000030;
  width: ${(props) => (props.isOpen ? '100%' : '0')};
`;

export const MenuButton = styled.button`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1010;
`;

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #f0f0f0;
  }
`;
