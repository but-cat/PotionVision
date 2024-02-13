<template>
	<div class="container my-12 mx-auto px-4 md:px-12">
		<div class="flex flex-wrap -mx-1 lg:-mx-4">
			<!-- Column -->
			<div v-for="i in 6" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
				<!-- Article -->
				<article class="overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
					<a href="#">
						<img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
					</a>

					<header class="flex items-center justify-between leading-tight p-2 md:p-4">
						<h1 class="text-lg">
							<a class="no-underline hover:underline text-black" href="#"> Article Title </a>
						</h1>
						<p class="text-grey-darker text-sm">11/1/19</p>
					</header>

					<footer class="flex items-center justify-between leading-none p-2 md:p-4">
						<a class="flex items-center no-underline hover:underline text-black" href="#">
							<img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random" />
							<p class="ml-2 text-sm">Author Name</p>
						</a>
						<a class="no-underline text-grey-darker hover:text-red-dark" href="#">
							<span class="hidden">Like</span>
							<i class="fa fa-heart"></i>
						</a>

						<svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
						</svg>
					</footer>
				</article>
				<!-- END Article -->
			</div>
			<!-- END Column -->
		</div>
	</div>
</template>
