import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Hub } from "./Hub";
import { LangProvider } from "./i18n";
import { CompaniesHome, CompanyPage, TrackPage } from "./companies/Companies";
import { ConceptsPage, ProjectPage, ProjectsHome } from "./projects/Projects";
import { StudyGroup, StudyHome, StudyQuick, StudyQuiz, StudySearch, StudySection, StudyTopic } from "./study/Study";

// HashRouter: GitHub Pages serves static files only, so deep links must live after the "#".
export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/study" element={<StudyHome />} />
          <Route path="/study/s/:sec" element={<StudySection />} />
          <Route path="/study/t/:sec/:topic" element={<StudyTopic />} />
          <Route path="/study/t/:sec/:topic/deep" element={<StudyTopic deep />} />
          <Route path="/study/o/:group" element={<StudyGroup />} />
          <Route path="/study/quick" element={<StudyQuick />} />
          <Route path="/study/quiz/:sec?" element={<StudyQuiz />} />
          <Route path="/study/search" element={<StudySearch />} />
          <Route path="/projects" element={<ProjectsHome />} />
          <Route path="/projects/concepts/:id?" element={<ConceptsPage />} />
          <Route path="/projects/:id/:tab?" element={<ProjectPage />} />
          <Route path="/companies" element={<CompaniesHome />} />
          <Route path="/companies/track/:id" element={<TrackPage />} />
          <Route path="/companies/:id" element={<CompanyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  );
}
