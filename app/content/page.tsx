"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { RepoContent } from '../types/content';

function ContentPage() {
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");
  const id = searchParams.get("id");

  const [repoContent, setRepoContent] = useState<RepoContent[] | null>(null);

  useEffect(()=>{
    async function fetchRepoContent(id: string, owner: string, repo: string){
      const res = await fetch(`http://localhost:3000/api/content/${id}/${owner}/${repo}`);
      const repoContent = await res.json();
      setRepoContent(repoContent.data);
    }

    if (id && owner && repo) {
      console.log(id, owner, repo);
      fetchRepoContent(id, owner, repo);
    }
  }, [id, repo, owner])
  
  return (
    <div>
      {repoContent && repoContent.map((repo)=>(
        <div key={repo.name}>
          <p>{repo.name}</p>
          <li>{repo.path}</li>
          <li>{repo.type}</li>
        </div>
      ))}
    </div>
  )
}

export default ContentPage;
