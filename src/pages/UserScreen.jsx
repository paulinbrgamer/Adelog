import { LogOut } from "lucide-react";
import { useAuth } from "../auth/Authprovider";
import Container from "../components/Container";
import IconButton from "../components/IconButton";

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
        backgroundColor: "#f9fafb", // Fundo claro
        borderRadius: "8px",
        boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"
      }}
    >
      {/* User Info Section */}
      <Container
        just="center"
        border="none"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "50%",
            margin: "20px 0",
          }}
          width={120}
          src={
            User?.permission === "box"
              ? "https://stories.freepiklabs.com/api/vectors/take-away/bro/render?color=37474FFF&background=complete&hide="
              : "https://stories.freepiklabs.com/api/vectors/business-plan/pana/render?color=B0BEC5FF&background=complete&hide="
          }
          alt="User Avatar"
        />
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            marginTop: "10px",
            color: "#374151",
          }}
        >
          {User?.name || "Usuário"}
        </h3>
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.95rem",
            color: "#4b5563",
          }}
        >
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
