import { Link } from "react-router-dom";
import {
  AudioOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SafetyOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const Home = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 text-slate-100">
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          Vero Scribe: Modern Healthcare, Simplified.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
          Welcome to the Vero Scribe Clinical Portal. Book seamless virtual or
          in-person consultations with certified medical professionals.
          Experience ambient healthcare powered by cutting-edge, AI-driven
          medical scribe assistance.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/doctors"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            Book Appointment
          </Link>
          <Link
            to="/appointments"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      <hr className="border-slate-800" />

      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Vero Scribe?
          </h2>
          <p className="text-slate-400 ">
            We bridge the gap between complex medical documentation and
            authentic patient interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <AudioOutlined />
            </div>
            <h3 className="text-xl font-semibold">Ambient AI Documentation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our advanced clinical scribes automatically capture and structure
              natural visit conversations, leaving physicians with 100%
              undivided attention for the patient.
            </p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <ClockCircleOutlined />
            </div>
            <h3 className="text-xl font-semibold">Faster Encounters</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Eliminating manual keyboard charting cuts down wait times,
              dramatically reduces clinic overhead, and ensures meaningful
              face-to-face time.
            </p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <SafetyOutlined />
            </div>
            <h3 className="text-xl font-semibold">HIPAA & PIPEDA Compliant</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Patient data privacy is sacred. All interactions are protected
              with strict end-to-end AES-256 encryption alongside
              industry-standard safety safeguards.
            </p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <FileTextOutlined />
            </div>
            <h3 className="text-xl font-semibold">Instant SOAP Generation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Converts raw spoken interaction into highly accurate, structured
              SOAP notes, discharge summaries, and referral briefs in under 5
              minutes.
            </p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <GlobalOutlined />
            </div>
            <h3 className="text-xl font-semibold">150+ Clinical Specialties</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trained natively across major medical, surgical, dental,
              psychiatric, and physical therapy terminology to capture exact
              clinical context.
            </p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <ThunderboltOutlined />
            </div>
            <h3 className="text-xl font-semibold">Intelligent Coding</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Extracts diagnostic assessments from ambient sound and mapping
              variables to automatically generate recommended ICD-10 medical
              billing codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
