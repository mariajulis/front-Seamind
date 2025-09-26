import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Calendar, Users, Bell, CheckCheck } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';

export const DashboardPsicologo = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [appointmentsData, patientsData, requestsData] = await Promise.all([
        mockApi.getAppointments(user.id, 'psicologo'),
        mockApi.getPatients(user.id),
        mockApi.getRequests(user.id),
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);

    const interval = setInterval(loadData, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-light border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAppointments = appointments.filter((apt) => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);

    const isToday = appointmentDate.getTime() === today.getTime();
    const isPsychologist = apt.psychologistId === user.id;
    const isScheduled = apt.status === 'agendado';

    return isToday && isPsychologist && isScheduled;
  });

  const totalPatients = patients.length;
  const completedSessions = appointments.filter(
    (apt) => apt.status === 'concluido' && apt.psychologistId === user.id
  ).length;
  const pendingRequests = requests.filter(
    (req) => req.status === 'pendente' && req.preferredPsychologist === user.id
  ).length;

  const upcomingAppointments = appointments
    .filter(
      (apt) =>
        new Date(apt.date) >= new Date() &&
        apt.status === 'agendado' &&
        apt.psychologistId === user.id
    )
    .slice(0, 5);

  const isNewPsychologist =
    totalPatients === 0 && appointments.length === 0 && requests.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <p className="text-blue-600">Bem-vindo, {user.name}</p>
      </div>

      {/* Mensagem para psicólogos novos */}
      {isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-dashed border-light/30">
          <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Bem-vindo ao Seamind!</h3>
          <p className="text-blue-600 mb-4">
            Você é novo por aqui. Seus pacientes e agendamentos aparecerão neste dashboard
            conforme você começar a receber solicitações e agendar sessões.
          </p>
          <p className="text-sm text-blue-500">
            Explore o menu lateral para conhecer todas as funcionalidades disponíveis.
          </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <KpiCard icon={Users} value={totalPatients} label="Pacientes Ativos" iconClass="text-blue-500" />
  <KpiCard icon={Calendar} value={todayAppointments.length} label="Sessões Hoje" iconClass="text-blue-500" />
  <KpiCard icon={CheckCheck} value={completedSessions} label="Sessões Concluídas" iconClass="text-blue-500" />
  <KpiCard icon={Bell} value={pendingRequests} label="Solicitações Pendentes" iconClass="text-blue-500" />
</div>
      {/* Próximos Agendamentos */}
      {!isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Próximos Agendamentos</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-blue-200 mx-auto mb-4" />
              <p className="text-dark mb-2">Nenhum agendamento futuro encontrado.</p>
              <p className="text-sm text-dark">
                {totalPatients === 0
                  ? 'Você ainda não possui pacientes cadastrados.'
                  : 'Todos os agendamentos estão em dia!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => {
                const patient = patients.find((p) => p.id === appointment.patientId);
                return (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 bg-white/10 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-blue-700">{patient?.name || 'Paciente não encontrado'}</p>
                      <p className="text-sm text-blue-500">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                      </p>
                      <p className="text-xs text-blue-400">{appointment.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'agendado'
                          ? 'bg-blue-100 text-blue-800'
                          : appointment.status === 'iniciado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {appointment.status === 'agendado'
                        ? 'Agendado'
                        : appointment.status === 'iniciado'
                        ? 'Iniciado'
                        : 'Concluído'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
