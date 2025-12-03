// ===== IMPORTS =====
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { psychologistService, requestService } from "../services/apiServices";
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import Calendar from '../components/Calendar';

// ===== COMPONENTE PRINCIPAL =====
export const Agendamento = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [psychologists, setPsychologists] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [requestData, setRequestData] = useState({
    description: '',
    urgency: 'media'
  });

  // Carregar psicólogos
  useEffect(() => {
    loadPsychologists();
  }, []);

  const loadPsychologists = async () => {
    try {
      const data = await psychologistService.getPsychologists();

      if (Array.isArray(data)) {
        setPsychologists(data);
      } else if (Array.isArray(data.psychologists)) {
        setPsychologists(data.psychologists);
      } else {
        toast.error("Formato inesperado recebido da API");
      }

    } catch (err) {
      toast.error('Erro ao carregar psicólogos');
    }
  };

  // Psicólogo selecionado (objeto completo)
  const selectedPsychologistData = psychologists.find(
    p => p.id === parseInt(selectedPsychologist)
  );

  // Enviar solicitação
  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPsychologist || !requestData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setSubmitting(true);

    try {
      await requestService.createRequest({
        patient_id: user.id,
        patient_name: user.name,
        patient_email: user.email,
        patient_phone: user.phone,
        preferred_psychologist: parseInt(selectedPsychologist),
        description: requestData.description,
        urgency: requestData.urgency,
        preferred_dates: [selectedDate],
        preferred_times: []
      });

      toast.success('Solicitação enviada! O psicólogo avaliará e entrará em contato.');
      navigate('/dashboard');

    } catch {
      toast.error('Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ===== Cabeçalho ===== */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Solicitar ser Paciente</h1>
        <p className="text-white">
          Escolha um psicólogo e descreva sua necessidade de atendimento
        </p>
      </div>

      {/* ===== Card Principal ===== */}
      <Card>
        <form onSubmit={handleRequestSubmit} className="space-y-6">

          {/* ===== SELETOR DE PSICÓLOGO ===== */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
              <Bell className="w-5 h-5" />
              Escolha o Psicólogo
            </label>

            <select
              value={selectedPsychologist}
              onChange={(e) => setSelectedPsychologist(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
              required
            >
              <option value="">Selecione um psicólogo</option>

              {psychologists.map(psych => (
                <option key={psych.id} value={psych.id}>
                  {psych.name} - {psych.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* ===== CALENDÁRIO ===== */}
          <Calendar onDateChange={setSelectedDate} />

          <p className="mt-4 text-dark">
            📅 Você selecionou: {selectedDate.toLocaleDateString("pt-BR")}
          </p>

          {/* ===== DESCRIÇÃO ===== */}
          <div>
            <label className="block text-lg font-medium text-dark mb-3">
              Descreva sua necessidade *
            </label>

            <textarea
              value={requestData.description}
              onChange={(e) =>
                setRequestData({ ...requestData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
              rows={4}
              placeholder="Ex: Gostaria de ser seu paciente. Preciso de ajuda com ansiedade..."
              required
            />
          </div>

          {/* ===== URGÊNCIA ===== */}
          <div>
            <label className="block text-lg font-medium text-dark mb-3">
              Nível de Urgência
            </label>

            <select
              value={requestData.urgency}
              onChange={(e) =>
                setRequestData({ ...requestData, urgency: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
            >
              <option value="baixa">Baixa - Posso aguardar</option>
              <option value="media">Média - Prefiro em breve</option>
              <option value="alta">Alta - Preciso urgentemente</option>
            </select>
          </div>

          {/* ===== CARD INFORMATIVO ===== */}
          {selectedPsychologistData && (
            <Card className="bg-blue-50">
              <h3 className="font-semibold text-dark mb-2">Informações Importantes</h3>

              <div className="space-y-2 text-sm text-dark/70">
                <p>
                  <strong>Psicólogo selecionado:</strong> {selectedPsychologistData.name}
                </p>

                <p>
                  <strong>Especialidade:</strong> {selectedPsychologistData.specialty}
                </p>

                <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Como funciona:</strong> Sua solicitação será enviada ao psicólogo.  
                    Se aceita, ele entrará em contato para agendar as sessões.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* ===== BOTÕES ===== */}
          <div className="flex gap-4 text-dark">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              className="flex-1 text-dark hover:text-light font-semibold rounded-full px-4 py-3"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              loading={submitting}
              className="flex-1 hover:text-light text-dark font-semibold rounded-full px-4 py-3"
              disabled={!selectedPsychologist || !requestData.description}
            >
              Enviar Solicitação
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};
