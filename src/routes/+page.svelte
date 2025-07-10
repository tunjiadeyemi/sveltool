<script>
  import LineReader from '$lib/components/LineReader.svelte';
  import Magnifier from '$lib/components/Magnifier.svelte';
  import { enableMagnifier } from '$lib/stores/magnifier';
  import { onMount } from 'svelte';

  onMount(() => {
    enableMagnifier.set(true);
  });
</script>

<LineReader backgroundColor="blue" />

<Magnifier borderRadius={100}>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum incidunt reiciendis
    praesentium autem inventore aperiam eveniet, cumque exercitationem veniam sint dolorum animi
    vero? Esse omnis dolores vel impedit animi eos amet. Quibusdam adipisci odit, nobis sunt tenetur
    est ullam non doloribus, impedit id dolorem veritatis vero eligendi nisi expedita animi
    voluptates, cum dignissimos. Neque, aperiam modi nam vitae blanditiis repellendus suscipit sit
    amet nemo quaerat molestias voluptatum voluptatibus ipsa sint corrupti obcaecati atque delectus
    provident aliquid? Officia illo repellendus iste corporis aut reiciendis distinctio aliquid
    cupiditate, perferendis suscipit omnis ut quasi officiis in recusandae dolorum totam veniam
    perspiciatis saepe quia nihil aperiam dolores. Asperiores mollitia veritatis natus eius a amet
    at maxime aliquid sint earum similique velit laborum odit, ullam voluptates molestiae neque aut
    obcaecati aperiam quisquam dolores vitae sed blanditiis. Vel tempora natus, quae laboriosam
    eveniet ipsam qui. Quo illo quis reiciendis perspiciatis ea officia optio, excepturi esse
    tempore, facilis expedita vel nam iure ducimus. Illo quas ut, non rem accusamus tempora
    distinctio? Sunt natus sapiente suscipit deserunt fugit quae quia ab magnam, rerum laborum
    libero voluptatibus nisi. Iste necessitatibus inventore laboriosam in ullam magni pariatur.
    Provident aliquam veniam hic cum, illum eos possimus quasi culpa odio adipisci suscipit eius
    officia dolores, velit minima magnam dolorum necessitatibus? Ab voluptatum repellat adipisci
    expedita modi, quidem suscipit molestiae voluptatem obcaecati tenetur in error similique magni,
    doloribus officia? Saepe suscipit iste, porro impedit harum deserunt cum quis doloremque
    consectetur fugit, nulla commodi sed voluptate, ad adipisci repellat officia eius ipsam odio
    nam. Sit voluptate, alias, vitae ab dolor ipsum adipisci sunt minima amet, qui est. Officiis
    eius provident facere ullam mollitia molestiae id perferendis saepe dolores voluptatum tempore,
    deserunt eum dolor exercitationem magni distinctio quam illo voluptate voluptatem unde vero
    fugit dicta velit aliquam! Eum officiis veritatis recusandae ducimus repellat accusamus fugit in
    aperiam necessitatibus? Magni modi quidem necessitatibus sapiente omnis! Voluptatum quia fuga
    delectus repellat natus asperiores. Excepturi distinctio dolores alias velit saepe possimus
    sunt, laboriosam voluptate tenetur corporis itaque, fugit illum accusantium voluptas unde
    voluptatum placeat nobis quia debitis dolore eligendi exercitationem expedita rem sequi!
    Dolorum, temporibus iste adipisci aliquam optio officiis quo eveniet accusamus nostrum error a
    nesciunt assumenda doloremque laboriosam. Amet totam laboriosam provident illum eaque modi.
    Molestias dicta aliquid assumenda voluptatum id. Neque sed soluta asperiores natus porro
    doloremque debitis eveniet sint, quia quasi laudantium iusto nobis ullam quod perspiciatis
    repudiandae aut nesciunt ipsa impedit commodi dolor reprehenderit magnam. Fugit deleniti
    officiis non voluptatem ut ab et rem error velit, odit fuga sed tempore veritatis nihil laborum
    voluptates quas at molestias hic, adipisci mollitia? Perspiciatis sed repellendus provident
    laboriosam corporis culpa aspernatur voluptas sint corrupti facilis sunt quidem hic rerum quod
    asperiores dolores unde, ab nostrum tempora vitae fugit enim ipsa! Esse quam placeat amet
    molestiae laudantium suscipit. Molestiae est architecto repudiandae laudantium. Eaque odio
    voluptatem minima exercitationem? Quo sit incidunt provident odio velit veritatis molestiae
    modi! Modi iste beatae illo adipisci iusto soluta aspernatur sint maiores consequuntur
    obcaecati. Libero repellat iste commodi, magnam molestiae minima voluptas?
  </p>
</Magnifier>
