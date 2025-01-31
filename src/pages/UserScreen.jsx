import { LogOut } from "lucide-react";
import { useAuth } from "../auth/Authprovider";
import Container from '../components/styled/Container'
import IconButton from "../components/IconButton";
import logo from '../../public/icon.png'
export default function UserScreen() {
  const { User, logout } = useAuth();
  const divStyle = {
    display: 'flex',
    flexDirection: "column",
    width: '80%',
    marginTop: "10px",
    fontSize: "0.95rem",
    color: "#4b5563",
  }
  const h3Style = {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
    marginTop: "10px",
    color: "#374151",
  }
  const h4Style = { fontWeight: "600", margin: "5px 0" }
  const redButtom = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    marginTop: "20px",
    padding: "10px 20px",
    border: "1px solid #e02323",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#e02323",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }
  const ContainerStyle = {
    overflowY:'scroll',
    alignItems: "center",
    minHeight: 0,
  }
  return (
    <Container style={ContainerStyle} >
      <div style={divStyle}>
        <img width={120} style={{ margin: "auto" }} src={logo} alt="Icon" />
        <h3 style={h3Style}>
          {User?.name || "Usuário"}
        </h3>
        <h4 style={h4Style} >E-mail:</h4>
        <p>{User?.email || "Não informado"}</p>
        <h4 style={h4Style}>Permissão:</h4>
        <p>{User?.permission || "Desconhecida"}</p>
      </div>
      <IconButton
        onclick={() => logout()}
        style={redButtom}
      >
        <LogOut
          size={26}
          strokeWidth={1.4}
          style={{ transform: "scaleX(-1)" }}
          color="#e02323"
        />
        <p>Sair</p>
      </IconButton>
    </Container>
  );
}
