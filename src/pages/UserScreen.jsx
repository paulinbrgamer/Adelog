import { LogOut } from "lucide-react";
import { useAuth } from "../auth/Authprovider";
import Container from "../components/Container";
import IconButton from "../components/IconButton";
import logo from '../../public/icon.png'
export default function UserScreen() {
  const { User, logout } = useAuth();

  return (
    <Container
      border="none"
      just="center"
      aligh="space-evenly"
      height="calc(100% - 160px)"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
      {/* User Info Section */}
      <Container
        just="start"
        border="none"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "censter",
        }}
      >

        <div
          style={{
            display:'flex',
            flexDirection:"column",
            width:'80%',
            marginTop: "10px",
            fontSize: "0.95rem",
            color: "#4b5563",
          }}
        >
          <img
            width={120}
            style={{margin:"auto"}}
            src={logo}
            alt="Icon"
          />
          <h3
            style={{
              textAlign:"center",
              fontSize: "1.2rem",
              fontWeight: "600",
              marginTop: "10px",
              color: "#374151",
            }}
          >
            {User?.name || "Usuário"}
          </h3>
          <h4 style={{ fontWeight: "600", margin: "5px 0" }}>E-mail:</h4>
          <p>{User?.email || "Não informado"}</p>
          <h4 style={{ fontWeight: "600", margin: "5px 0" }}>Permissão:</h4>
          <p>{User?.permission || "Desconhecida"}</p>
        </div>
      </Container>

      {/* Logout Button */}
      <IconButton
        onclick={() => logout()}
        style={{
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
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#fce2e2"; // Fundo ao passar o mouse
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"; // Fundo padrão
        }}
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
