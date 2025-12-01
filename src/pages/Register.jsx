// importações
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";

export const Register = () => {
  const [userType, setUserType] = useState("paciente");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CRP: "",
    specialty: "",
    phone: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType,
      });
      login(user, token);
      toast.success("Conta criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-md rounded-2xl p-8 bg-gray-50 shadow-md">
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Criar Conta</h1>
        </div>

        {/* Abas de seleção de usuário */}
        <div className="flex justify-start mb-6 space-x-4">
          <button
            type="button"
            onClick={() => setUserType("paciente")}
            className={`px-4 py-2 font-semibold rounded-full transition-colors ${
              userType === "paciente"
                ? "bg-blue-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            PACIENTE
          </button>
          <button
            type="button"
            onClick={() => setUserType("psicologo")}
            className={`px-4 py-2 font-semibold rounded-full transition-colors ${
              userType === "psicologo"
                ? "bg-blue-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            PSICÓLOGO
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
          <Input
            label="NOME COMPLETO"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Digite seu nome completo"
            required
            className="bg-white rounded-md"
          />
          <Input
            label="E-MAIL"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="Digite seu e-mail"
            required
            className="bg-white rounded-md"
          />
          <Input
            label="SENHA"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Digite sua senha"
            required
            showPasswordToggle
            className="bg-white rounded-md"
          />
          <Input
            label="CONFIRMAR SENHA"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            required
            showPasswordToggle
            className="bg-white rounded-md"
          />

          {/* TELEFONE (logo abaixo do confirmar senha) */}
          <Input
            label="TELEFONE"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            placeholder="(99) 99999-9999"
            required
            className="bg-white rounded-md"
          />

          {userType === "paciente" && (
            <Input
              label="DATA DE NASCIMENTO"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange("birthDate")}
              required
              className="bg-white rounded-md"
            />
          )}

          {userType === "psicologo" && (
            <>
              <Input
                label="CRP"
                value={formData.CRP}
                onChange={handleInputChange("CRP")}
                placeholder="Ex: 12/34567"
                required
                className="bg-white rounded-md"
              />
              <Input
                label="ESPECIALIDADE"
                value={formData.specialty}
                onChange={handleInputChange("specialty")}
                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                required
                className="bg-white rounded-md"
              />
            </>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Criar Conta
          </Button>
        </form>

        {/* Link para login */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-700">Já possui conta?</p>
          <Link
            to="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Faça login!
          </Link>
        </div>
      </Card>
    </div>
  );
};
