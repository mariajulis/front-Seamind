import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Users, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pacientes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadPatients]);

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <h1 className="text-2xl font-bold text-center text-dark">Meus pacientes</h1>

      {/* Lista */}
      <div className="grid gap-6">
        {patients.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 rounded-lg shadow">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Nenhum paciente encontrado</h3>
            <p className="text-gray-500">Seus pacientes aparecerão aqui conforme os agendamentos.</p>
          </div>
        ) : (
          patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg bg-[#c1d6dd] p-6 shadow-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome e idade */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-800">{patient.name}</span>
                  </div>
                  {patient.age && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-700" />
                      <span className="text-gray-700">Idade {patient.age} anos</span>
                    </div>
                  )}
                  {patient.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-700" />
                      <span className="text-gray-700">{patient.phone}</span>
                    </div>
                  )}
                </div>

                {/* Data de nascimento + botão */}
                <div className="flex flex-col justify-between items-start sm:items-end">
                  {patient.birthDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-700" />
                      <span className="text-gray-700">
                        Data de Nascimento {patient.birthDate}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => navigate(`/pacientes/${patient.id}`)}
                    className="mt-4 sm:mt-0 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    mais informações do paciente
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
0
8