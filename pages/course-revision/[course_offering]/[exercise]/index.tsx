import Avatar from 'boring-avatars'
import { Flex } from 'components/Flex'
import { Text } from 'components/Text'
import { allCourseRevisionOfferings, allCourseRevisionExercises } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Head from 'next/head'
import Image from 'next/image'
import { Box } from 'components/Box'
import Callout from 'components/Callout'
import FileName from 'components/Filename'
import Centerer from 'components/Centerer'
import MultiChoice from 'components/MultiChoice'
import Link from 'next/link'
import { ArrowDown, ArrowLeft } from 'phosphor-react'
import ArticleLayout from 'components/ArticleLayout'
import { Button } from 'components/Button'

const defaultComponents = {
  Image,
  Callout,
  FileName,
  Centerer,
  MultiChoice,
  Link,
  ArrowDown
}

// Add any components used in MDX files here.
// Components here load dynamically if they're used.
// See https://github.com/tsriram/with-mdx-bundler for details.
const components = { ...defaultComponents }

export async function getStaticPaths() {
  const paths = []
  allCourseRevisionOfferings.forEach((o) => {
    allCourseRevisionExercises.forEach((e) => {
      paths.push({ params: { course_offering: o.slug, exercise: e.slug } })
    })
  })
  console.log("paths: ", paths);

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const puzzle = allCourseRevisionExercises.find((e) => e.slug === params.exercise)
  return {
    props: {
      puzzle
    }
  }
}

const PuzzleLayout = ({ puzzle }) => {
  const MDXContent = useMDXComponent(puzzle.body.code)

  return (
    <ArticleLayout>
      <Head>
        <title>{puzzle.title}</title>
      </Head>
      <Link href="/1511-revision-practical">
        <Button css={{ padding: '3px 14px', borderRadius: '100vh', width: "fit-content" }}>
          <ArrowLeft />Back
        </Button>
      </Link>
      <Text
        size="headline"
        css={{
          color: '$slate12',
          fontWeight: '600',
          paddingTop: '$2',
          alignSelf: 'center'
        }}>
        {puzzle.title}
      </Text>
      <Box css={{ paddingTop: '$2' }}>
        <Text>
          <MDXContent components={components} />
        </Text>
      </Box>
    </ArticleLayout>
  )
}

export default PuzzleLayout
