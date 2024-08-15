'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

interface ICurso {
  id: number;
  titulo: string;
  preco: number;
}

interface IshoppingItem {
  produto: ICurso;
  quantidade: number;
}

const cursos: ICurso[] = [
  { id: 1, titulo: 'Maquiagem - Basica', preco: 200.00 },
  { id: 2, titulo: 'Maquiagem Dia - Dia', preco: 250.00 },
  { id: 3, titulo: 'Maquiagem Profissional', preco: 500.00 },
  { id: 4, titulo: 'Maquiagem Casamento', preco: 650.00 },
];

const MarketCarPages: React.FC = () => {
  const [shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([]);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [hoveredPrintButton, setHoveredPrintButton] = useState<boolean>(false);

  const handleAddCurso = (id: number) => {
    const curso = cursos.find((curso) => curso.id === id);

    if (!curso) return;

    const itemExistente = shoppingCurso.find((item) => item.produto.id === id);

    if (itemExistente) {
      const newShoppingCurso = shoppingCurso.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      setShoppingCurso(newShoppingCurso);
    } else {
      setShoppingCurso([...shoppingCurso, { produto: curso, quantidade: 1 }]);
    }
  };

  const handleRemoveCurso = (id: number) => {
    setShoppingCurso(shoppingCurso.filter((item) => item.produto.id !== id));
  };

  const totalPreco = shoppingCurso.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <Header>Cursos de Maquiagem</Header>
      <CursoList>
        {cursos.map((curso) => (
          <CursoItem
            key={curso.id}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <CursoTitle>{curso.titulo}</CursoTitle>
            <CursoPrice>R$ {curso.preco.toFixed(2)}</CursoPrice>
            <AddButton
              onClick={() => handleAddCurso(curso.id)}
              onMouseEnter={() => setHoveredButton(curso.id)}
              onMouseLeave={() => setHoveredButton(null)}
              isHovered={hoveredButton === curso.id}
            >
              Adicionar
            </AddButton>
          </CursoItem>
        ))}
      </CursoList>

      <CartWrapper>
        <Cart>
          <CartHeader>Carrinho de Compras</CartHeader>
          <CartList>
            {shoppingCurso.map((item) => (
              <CartItem key={item.produto.id}>
                <CartTitle>{item.produto.titulo}</CartTitle>
                <CartPrice>R$ {item.produto.preco.toFixed(2)}</CartPrice>
                <CartQuantity>Quantidade: {item.quantidade}</CartQuantity>
                <CartTotal>Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}</CartTotal>
                <RemoveButton onClick={() => handleRemoveCurso(item.produto.id)}>
                  Remover
                </RemoveButton>
              </CartItem>
            ))}
          </CartList>
          <Total>Total do Carrinho: R$ {totalPreco.toFixed(2)}</Total>
          <PrintButton
            onClick={handlePrint}
            onMouseEnter={() => setHoveredPrintButton(true)}
            onMouseLeave={() => setHoveredPrintButton(false)}
            isHovered={hoveredPrintButton}
          >
            Imprimir Nota Fiscal
          </PrintButton>
        </Cart>
      </CartWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: 'Georgia', serif;
  color: #333;
  margin: 20px auto;
  background-color: #e6e6fa;
  padding: 30px;
  border-radius: 12px;
  max-width: 1100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h1`
  text-align: center;
  color: #000;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const CursoList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CursoItem = styled.li`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  text-align: center;
`;

const CursoTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #212121;
`;

const CursoPrice = styled.p`
  font-size: 20px;
  color: #757575;
  margin-bottom: 15px;
`;

const AddButton = styled.button<{ isHovered: boolean }>`
  color: #fff;
  padding: 14px 28px;
  border: none;
  border-radius: 6px;
  margin-top: 12px;
  width: 100%;
  text-align: center;
  background-color: ${({ isHovered }) => (isHovered ? '#87ceeb' : '#add8e6')};
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 16px;
  cursor: pointer;
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Cart = styled.div`
  width: 400px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const CartHeader = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
`;

const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  margin-bottom: 15px;
  color: #333;
`;

const CartTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const CartPrice = styled.p`
  font-size: 18px;
  color: #757575;
`;

const CartQuantity = styled.p`
  font-size: 18px;
  color: #757575;
`;

const CartTotal = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: #f44336;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
`;

const Total = styled.h2`
  color: #4caf50;
  font-size: 20px;
  margin-top: 25px;
  text-align: center;
`;

const PrintButton = styled.button<{ isHovered: boolean }>`
  color: #fff;
  padding: 14px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-top: 25px;
  font-size: 18px;
  background-color: ${({ isHovered }) => (isHovered ? '#87ceeb' : '#add8e6')};
  transition: background-color 0.3s ease;
`;

export default MarketCarPages;
