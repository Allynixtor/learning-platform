import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Text } from 'components/Text'
import { allArticleTypes, allCourseRevisionOfferings, ArticleType, CourseRevisionOffering } from 'contentlayer/generated'
import { compareAsc, compareDesc } from 'date-fns'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { DiscordLogo, FacebookLogo, InstagramLogo, ArrowRight } from 'phosphor-react'
import { ArticlesCarousel } from 'components/ArticlesCarousel'
import CourseRevisionCard from 'components/course-revision/CourseRevisionCard'
import { styled } from '@stitches/react'
import CourseRevisionMiniCard from 'components/course-revision/CourseRevisionMiniCard'
import CourseRevisionContainerHomePage from 'components/course-revision/CourseRevisionContainerHomePage'

type PropTypes = {
  articles: ArticleType[],
  courseOfferingContent: CourseRevisionOffering[],
}

export async function getStaticProps() {
  const articles = allArticleTypes.sort((a, b) => {
    return compareAsc(new Date(b.date), new Date(a.date))
  })
  return { props: { articles, courseOfferingContent: allCourseRevisionOfferings } }
}

const Home: NextPage = ({ articles, courseOfferingContent }: PropTypes) => {
  return (
    <Box>
      <Head>
        <title>CSESoc Learn</title>
        <meta
          name="description"
          content="Where your curiosity comes to wander"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        as="main"
        css={{
          marginTop: '3rem',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1rem',
        }}>
        <Text
          as="h1"
          size="display"
          css={{ color: '$slate12', fontWeight: '600', paddingTop: '$6' }}>
          Where your curiosity comes to wander
        </Text>
        <Text
          as="span"
          size="title-sm"
          css={{ color: '$slate12', paddingTop: '$1', textAlign: "center", width: "70%" }}>
          From articles on new technologies to sample projects, your learning
          outside the classroom starts here.
        </Text>
        <Link href="/articles">
          <Button size="default" css={{ marginTop: '$6', cursor: 'pointer' }}>
            Learn something new
            <ArrowRight weight="bold" />
          </Button>
        </Link>
      </Flex>
      <Flex
        as="main"
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1rem',
        }}>
        <Text
          size="headline"
          css={{ fontWeight: 600, paddingTop: '$8', paddingBottom: '$4' }}>
          Course Revision
        </Text>
        <Text
          as="span"
          size="title-sm"
          css={{ color: '$slate12', paddingTop: '$1', textAlign: "center", width: "70%" }}>
          Revise for your upcoming final exams with practice problems written by our Education Team. Solutions provided.
        </Text>
        <CourseRevisionContainerHomePage allCourseRevisionOfferings={courseOfferingContent} />
      </Flex>
      <Flex
        as="main"
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1rem',
        }}>
        <Text
          size="headline"
          css={{ fontWeight: 600, paddingTop: '$8', paddingBottom: '$4' }}>
          See what&apos;s new
        </Text>
      </Flex>
      <ArticlesCarousel articles={articles} />
      <Flex
        as="main"
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1rem',
        }}>
        <Text size="headline" css={{ fontWeight: 600, paddingTop: '$8' }}>
          Join the CSESoc community
        </Text>
        <Text
          as="span"
          size="title-sm"
          css={{ color: '$slate12', paddingTop: '$1', textAlign: "center", width: "70%" }}>
          Make friends with like-minded students and stay up-to-date with
          events.
        </Text>
        <Flex
          css={{
            padding: '$6 0',
            gap: '$7',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
          <Card css={{ backgroundColor: '$slate12', overflow: 'hidden' }}>
            <Box css={{ margin: '-$6 -$5 $5 -$5' }}>
              <Image
                alt='Discord Logo'
                src="/images/contribute.png"
                width="702"
                height="226"
                objectFit="cover"
              />
            </Box>
            <Text
              size="title-lg"
              css={{ fontWeight: '600', padding: '$2', color: '$slate1' }}>
              Psst... you might be our next creator.
            </Text>
            <Text css={{ padding: '$2', color: '$slate1' }}>
              Passionate about a technical topic and want to create content? Any
              skill levels welcome - learn more below!
            </Text>
            <Link href="/creators">
              <Button
                size="default"
                css={{
                  width: 'fit-content',
                  marginTop: '$4',
                  cursor: 'pointer',
                  backgroundColor: '$green6',
                  '&:hover': { backgroundColor: '$green7' }
                }}>
                Contribute
                <ArrowRight weight="bold" />
              </Button>
            </Link>
          </Card>
          <Flex
            direction="column"
            justify="between"
            align="center"
            css={{ height: '28rem' }}>
            {/* TODO: avoid copypaste for social media buttons */}
            <a
              href="https://cseso.cc/discord/"
              target="blank"
              style={{ textDecoration: 'none', width: '100%', }}>
              <Button
                size="large"
                css={{
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: '$indigo4',
                  '&:hover': { backgroundColor: '$indigo5' }
                }}>
                <Flex
                  css={{ padding: '$3 $1 $3 $2', color: '$indigo10' }}>
                  <DiscordLogo weight="fill" size={36} />
                </Flex>
                <Text size="title-md" css={{ fontWeight: '600' }}>
                  Discord
                </Text>
                <Flex
                  css={{ flex: 1, padding: '$3', justifyContent: 'flex-end' }}>
                  <ArrowRight weight="bold" size={32} />
                </Flex>
              </Button>
            </a>
            <a
              href="https://www.facebook.com/csesoc/"
              target="blank"
              style={{ textDecoration: 'none' }}>
              <Button
                size="large"
                css={{
                  width: '24em',
                  marginTop: '$6',
                  cursor: 'pointer',
                  backgroundColor: '$blue4',
                  '&:hover': { backgroundColor: '$blue5' }
                }}>
                <Flex css={{ padding: '$3 $1 $3 $2', color: '$blue10' }}>
                  <FacebookLogo weight="fill" size={36} />
                </Flex>
                <Text size="title-md" css={{ fontWeight: '600' }}>
                  Facebook
                </Text>
                <Flex
                  css={{ flex: 1, padding: '$3', justifyContent: 'flex-end' }}>
                  <ArrowRight weight="bold" size={32} />
                </Flex>
              </Button>
            </a>
            <a
              href="https://www.instagram.com/csesoc_unsw/"
              target="blank"
              style={{ textDecoration: 'none' }}>
              <Button
                size="large"
                css={{
                  width: '24em',
                  marginTop: '$6',
                  cursor: 'pointer',
                  backgroundColor: '$pink4',
                  '&:hover': { backgroundColor: '$pink5' }
                }}>
                <Flex css={{ padding: '$3 $1 $3 $2', color: '$pink10' }}>
                  <InstagramLogo weight="fill" size={36} />
                </Flex>
                <Text size="title-md" css={{ fontWeight: '600' }}>
                  Instagram
                </Text>
                <Flex
                  css={{ flex: 1, padding: '$3', justifyContent: 'flex-end' }}>
                  <ArrowRight weight="bold" size={32} />
                </Flex>
              </Button>
            </a>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Home

