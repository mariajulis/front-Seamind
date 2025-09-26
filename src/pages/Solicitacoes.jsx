
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Button } from "../components/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Bell, User, Clock, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export const Solicitacoes = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingRequests, setProcessingRequests] = useState(new Set());

    useEffect(() => {
        loadRequests();
    }, [user.id]);

    const loadRequests = async () => {
        setLoading(true);
        try {
            const data = await mockApi.getRequests(user.id);
            const pendingRequests = data.filter((req) => req.status === "pendente");
            setRequests(pendingRequests);
        } catch (error) {
            console.error("Erro ao carregar solicitações:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (requestId, requestData) => {
        setProcessingRequests((prev) => new Set([...prev, requestId]));
        try {
            const existingPatients = await mockApi.getPatients(user.id);
            const duplicatePatient = existingPatients.find(
                (p) => p.email === requestData.patientEmail
            );

            if (duplicatePatient) {
                toast.error("Este paciente já está cadastrado!");
                return;
            }

            await mockApi.createPatient({
                name: requestData.patientName,
                email: requestData.patientEmail,
                phone: requestData.patientPhone,
                birthDate: "1990-01-01",
                age: 30,
                status: "Ativo",
                psychologistId: user.id,
            });

            await mockApi.updateRequestStatus(requestId, "aceito", "Paciente aceito");
            setRequests((prev) => prev.filter((req) => req.id !== requestId));
            toast.success("Solicitação aceita!");
        } catch (error) {
            console.error("Erro ao aceitar solicitação:", error);
            toast.error("Erro ao processar solicitação");
        } finally {
            setProcessingRequests((prev) => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    const handleRejectRequest = async (requestId) => {
        setProcessingRequests((prev) => new Set([...prev, requestId]));
        try {
            await mockApi.updateRequestStatus(requestId, "rejeitado", "Rejeitada");
            setRequests((prev) => prev.filter((req) => req.id !== requestId));
            toast.success("Solicitação rejeitada.");
        } catch (error) {
            console.error("Erro ao rejeitar solicitação:", error);
            toast.error("Erro ao processar solicitação");
        } finally {
            setProcessingRequests((prev) => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] px-6 py-10 space-y-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
            >
                <div className="bg-cyan-700 p-3 rounded-xl shadow-md">
                    <Bell className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    Solicitações
                </h1>
            </motion.div>

            {/* Lista */}
            <div className="grid gap-6">
                {requests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl"
                    >
                        <Bell className="w-14 h-14 text-gray-400 mx-auto mb-3 animate-pulse" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                            Nenhuma solicitação
                        </h3>
                        <p className="text-sm text-gray-500">
                            Quando houver novas solicitações, elas aparecerão aqui.
                        </p>
                    </motion.div>
                ) : (
                    requests.map((request, index) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
                            }}
                            className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 space-y-5"
                        >
                            {/* Cabeçalho */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center shadow-sm">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {request.patientName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {request.patientEmail}
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                    {request.urgency === "alta"
                                        ? "Alta urgência"
                                        : request.urgency === "media"
                                            ? "Média urgência"
                                            : "Baixa urgência"}
                                </span>
                            </div>

                            {/* Descrição */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {request.description}
                            </p>

                            {/* Data */}
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock className="w-4 h-4" />
                                {new Date(request.createdAt).toLocaleDateString("pt-BR")}
                            </div>

                            {/* Ações */}
                            <div className="flex gap-3 pt-3">
                                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                    <Button
                                        onClick={() => handleRejectRequest(request.id)}
                                        loading={processingRequests.has(request.id)}
                                        className="w-full rounded-xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Rejeitar
                                    </Button>
                                </motion.div>
                                <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                    <Button
                                        onClick={() => handleAcceptRequest(request.id, request)}
                                        loading={processingRequests.has(request.id)}
                                        className="w-full rounded-xl bg-[#2563eb] text-white hover:bg-[#1e4fd9] flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Aceitar
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
