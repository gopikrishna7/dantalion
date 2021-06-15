import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Anchor from '../components/atoms/Anchor';
import Header from '../components/atoms/Header';
import Article from '../components/molecules/Article';
import Footer from '../components/molecules/Footer';
import BirthForm from '../components/organisms/BirthForm';
import Result from '../components/organisms/Result';
import { usePSDecoder } from '../hooks/usePersonality';

/** The index page component */
const Component: NextPage = () => {
  const { t } = useTranslation();
  const [ps, nickname] = usePSDecoder();
  return (
    <>
      <Header>
        {ps ? t('web.result.heading', { nickname }) : t('web.description')}
      </Header>
      <main className="md:container mx-auto text-gray-600">
        <Result />
        <BirthForm />
        <Article
          featureBody={t('web.feature.body', { returnObjects: true })}
          featureHeading={t('web.feature.title')}
          tooltipFeatureDetails={t('web.tooltip.summary')}
        >
          {t('web.preface', { joinArrays: '\n\n' })}
        </Article>
        <ReactMarkdown className="mx-0 my-5 nm-inset-gray-500-sm overflow-auto p-6 text-white md:rounded-3xl">
          {t('web.install', { joinArrays: '\n' })}
        </ReactMarkdown>
        <p className="font-bold text-center text-xl py-6">
          <Anchor href="https://github.com/kurone-kito/dantalion">
            {t('web.seeRepo')}
          </Anchor>
        </p>
      </main>
      <Footer author={t('web.author')} />
    </>
  );
};
Component.displayName = 'Index';

export default Component;
