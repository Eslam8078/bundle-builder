import Accordion from './components/accordion/Accordion'
import PageHeader from './components/layout/PageHeader'
import ReviewPanel from './components/review/ReviewPanel'
import { BundleProvider } from './state/BundleContext'

export default function App() {
  return (
    <BundleProvider>
      <div className="page">
        <PageHeader />
        <div className="builder-layout">
          <Accordion />
          <ReviewPanel />
        </div>
      </div>
    </BundleProvider>
  )
}
