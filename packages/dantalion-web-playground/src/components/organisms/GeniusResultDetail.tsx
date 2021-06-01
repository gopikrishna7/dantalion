import type {
  DesctiptionsType,
  PersonalityDetailType,
  PersonalityType,
} from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Details from '../molecules/Details';
import InlineMarkdownList from '../molecules/InlineMarkdownList';
import ResultDetail from '../molecules/ResultDetail';

/** Type definition of the required attributes. */
export interface Props {
  readonly descriptions: Pick<
    DesctiptionsType,
    'genius1' | 'genius2' | 'strategy' | 'weak'
  >;
  readonly details: PersonalityDetailType;
  readonly inner: PersonalityType;
  /** Specifies the nickname. */
  readonly nickname?: string;
  readonly outer: Pick<PersonalityType, 'name' | 'summary'>;
  readonly workStyle: Pick<PersonalityType, 'name' | 'summary'>;
}

const createSource = ({
  inner,
  outer,
  workStyle,
}: Pick<Props, 'inner' | 'outer' | 'workStyle'>) =>
  (
    [
      ['inner', inner],
      ['outer', outer],
      ['workStyle', workStyle],
    ] as const
  ).map<readonly [string, string]>(([key, { summary, name }]) => [
    `web.result.genius.${key}`,
    `${summary} ... **${name}**`,
  ]);

const Component: VFC<Props> = ({
  descriptions,
  details,
  inner,
  nickname,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <ResultDetail
      heading={details.name}
      headingDetail={details.detail}
      hook={
        <>
          {inner.summary}
          <br />
          {t('web.result.probed', { nickname, type: inner.name })}
        </>
      }
      moreDetail={inner.detail}
    >
      <Details caption={descriptions.weak} tooltip={t('web.tooltip.summary')}>
        {inner.weak}
      </Details>
      <Details
        caption={descriptions.strategy}
        tooltip={t('web.tooltip.summary')}
      >
        {inner.strategy}
      </Details>
      <hr className="border-gray-300 my-3" />
      <ReactMarkdown>{descriptions.genius1}</ReactMarkdown>
      <InlineMarkdownList className="list-decimal p-4 md:px-8" order>
        {Object.values(details.descriptions)}
      </InlineMarkdownList>
      <ReactMarkdown>{descriptions.genius2}</ReactMarkdown>
      <InlineMarkdownList className="list-decimal p-4 md:px-8" order>
        {createSource({ inner, ...props }).map(([key, type]) =>
          t(key, { type })
        )}
      </InlineMarkdownList>
    </ResultDetail>
  );
};
Component.displayName = 'GeniusResultDetail';

export default Component;