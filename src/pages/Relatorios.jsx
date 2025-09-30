import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error("Erro ao carregar dados dos relatórios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [user.id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const { stats, frequencyData, statusData, riskAlerts, patientsData } =
    reportsData;

  const hasNoData =
    stats.activePatients === 0 && stats.totalSessions === 0;

  return (
    <div className="space-y-8 px-6 py-6 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 min-h-screen rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-dark mb-2">
          Relatórios e Analytics
        </h1>
        <p className="text-gray-700">
          Acompanhe métricas e indicadores da sua prática
        </p>
      </motion.div>

      {hasNoData ? (
        <Card className="text-center py-12 border-2 border-dashed border-gray-300 bg-white/70 shadow-sm">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Relatórios em Construção
          </h3>
          <p className="text-gray-700 mb-4">
            Seus relatórios e analytics aparecerão aqui conforme você atender
            pacientes e realizar sessões.
          </p>
          <p className="text-sm text-gray-500">
            Comece aceitando solicitações de pacientes para gerar dados
            estatísticos.
          </p>
        </Card>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-700 mx-auto mb-2" />,
                value: stats.activePatients,
                label: "Pacientes Ativos",
              },
              {
                icon: (
                  <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                ),
                value: stats.totalSessions,
                label: "Total de Sessões",
              },
              {
                icon: (
                  <TrendingUp className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                ),
                value: `${stats.attendanceRate}%`,
                label: "Taxa de Conclusão",
              },
              {
                icon: (
                  <AlertTriangle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                ),
                value: stats.riskAlerts,
                label: "Alertas de Risco",
              },
            ].map((kpi, index) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl transition rounded-xl p-6">
                  {kpi.icon}
                  <h3 className="text-3xl font-bold text-dark">
                    {kpi.value}
                  </h3>
                  <p className="text-gray-700 text-sm">{kpi.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="bg-white/80 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-dark  mb-4">
                  Frequência de Sessões
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Card className="bg-white/80 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-dark mb-4">
                  Status das Sessões
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card className="bg-white/80 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-dark mb-4 text-center">
                  Pacientes por Status de Sessão
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={patientsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {patientsData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Card className="bg-white/80 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold text-dark mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-500" />
                  Alertas de Risco
                </h2>
                <div className="space-y-3">
                  {riskAlerts.length === 0 ? (
                    <p className="text-gray-700 text-center py-4">
                      Nenhum alerta de risco no momento
                    </p>
                  ) : (
                    riskAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex justify-between items-center p-4 bg-blue-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {alert.patient}
                          </p>
                          <p className="text-sm text-gray-700">
                            {alert.reason}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              alert.risk === "Alto"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            Risco {alert.risk}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(alert.date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};
