import { SmileyXEyes } from "@phosphor-icons/react";
import { Container } from "./styles";

export function NoData() {
  return (
    <Container>
      <SmileyXEyes size={150} color="#1E1E1E" />
      <h2>Desculpe, sem dados para visualizar.</h2>
    </Container>
  )
}