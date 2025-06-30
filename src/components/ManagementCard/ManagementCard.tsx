import React, { useState, useEffect } from "react"
import { Link } from "react-router"
import {
  card,
  link,
  cardImageContainer,
  cardContent,
  cardTitle,
} from "./ManagementCard.module.css"
import { TeamMember } from "../../utils/content"

interface ManagementCardProps {
  member: TeamMember
  slug: string
}

function ManagementCard({ member, slug }: ManagementCardProps) {
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../../content/Team/${member.slug}/${member.headshot}`)
        setImageUrl(imageModule.default)
      } catch (error) {
        console.warn(`Headshot ${member.headshot} not found for ${member.name}`)
      }
    }

    loadImage()
  }, [member.headshot, member.slug])

  return (
    <>
      <div className={card}>
        <Link to={`/team/${slug}`} className={link}>
          <div className={cardImageContainer}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          <div className={cardContent}>
            <p className={cardTitle}>
              {member.name} | {member.position}
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ManagementCard
